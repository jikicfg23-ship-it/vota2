/* ==========================================================================
   VOTA OMNI-SEARCH v4.0 - محرك البحث الشامل متعدد المصادر + التدقيق الرياضي
   صُمم بواسطة محمد ربيع
   يربط 6 مصادر معرفة عالمية مفتوحة (بدون API) بعقل Vota الرياضي
   ========================================================================== */

const VotaOmniSearch = (() => {
  // الذاكرة العميقة لتخزين تفاصيل جميع المصادر لدعم أسئلة المتابعة ("تفصيل أكتر")
  let omniMemory = {
    topic: "",
    lang: "ar",
    allCandidates: [],
    usedSet: new Set(),
    sourcesUsed: []
  };

  // ذاكرة التخزين المؤقت السريعة O(1)
  const omniCache = new Map();

  // 1. دالة التجزئة السريعة (FNV-1a 32-bit Hash)
  function fnv1aHash(str) {
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return h >>> 0;
  }

  // 2. معادلات الجبر الخطي والتدقيق المتقاطع (Cross-Source Consensus & Softmax Routing)
  const OmniMath = {
    softmax: (logits, temp = 1.0) => {
      const maxLogit = Math.max(...logits);
      const exps = logits.map(l => Math.exp((l - maxLogit) / (temp || 1)));
      const sum = exps.reduce((a, b) => a + b, 0) || 1;
      return exps.map(e => e / sum);
    },

    // قياس التشابه الدلالي بين جملتين من مصدرين مختلفين (Jaccard + Dice Coefficient)
    diceSimilarity: (tokensA, tokensB) => {
      if (!tokensA.length || !tokensB.length) return 0;
      const setA = new Set(tokensA);
      const setB = new Set(tokensB);
      let intersection = 0;
      setA.forEach(x => { if (setB.has(x)) intersection++; });
      return (2 * intersection) / (setA.size + setB.size);
    },

    // توجيه النية الاحتمالي لتحديد وزن كل مصدر بناءً على طبيعة السؤال
    computeSourceWeights: (query) => {
      const q = query.toLowerCase();
      let logits = [1.2, 1.0, 0.8, 0.7, 0.7, 0.9]; // [Wiki, Wikidata, OpenAlex, Wiktionary, OpenLibrary, DDG]

      // أسئلة علمية وأكاديمية -> رفع وزن OpenAlex
      if (/(علم|فيزياء|كيمياء|طب|مرض|بحث|دراسة|نظرية|ذرة|فلك|هندسة|science|physics|medical|study|research|theory|chimie|physique|recherche)/i.test(q)) {
        logits[2] += 1.6;
        logits[0] += 0.5;
      }
      // أسئلة حقائق وأرقام وتواريخ -> رفع وزن Wikidata
      if (/(متى|كم|عدد|تاريخ|مؤسس|عاصمة|رئيس|طول|مساحة|when|how many|capital|founder|born|quand|combien|capitale)/i.test(q)) {
        logits[1] += 1.7;
      }
      // أسئلة لغوية ومعاني كلمات -> رفع وزن Wiktionary
      if (/(معنى|مرادف|تعريف كلمة|مفرد|جمع|meaning|define|synonym|sens|définition)/i.test(q)) {
        logits[3] += 1.8;
      }
      // أسئلة عن كتب ومؤلفين -> رفع وزن OpenLibrary
      if (/(كتاب|رواية|مؤلف|كاتب|تأليف|book|novel|author|written by|livre|roman|auteur)/i.test(q)) {
        logits[4] += 1.8;
      }

      const weights = OmniMath.softmax(logits, 1.1);
      return {
        wikipedia: weights[0],
        wikidata: weights[1],
        openalex: weights[2],
        wiktionary: weights[3],
        openlibrary: weights[4],
        ddg: weights[5]
      };
    }
  };

  // 3. كشف نية المتابعة والتوسيع ("تفصيل أكتر", "اشرح", "لماذا")
  function isExpansionQuery(query) {
    const q = query.toLowerCase().trim();
    const triggers = [
      "تفصيل", "فصل", "اشرح", "توضيح", "المزيد", "اكتر", "أكثر", "كمل", "مثال", "ليه", "لماذا",
      "detail", "details", "explain", "more", "elaborate", "continue", "example", "why",
      "détail", "explique", "plus", "exemple", "pourquoi"
    ];
    return triggers.some(w => q.includes(w)) && q.split(/\s+/).length <= 5;
  }

  // 4. الاستعلام المتوازي من المصادر الستة المجانية (بدون API)
  async function fetchAllSources(searchQuery, lang) {
    const encoded = encodeURIComponent(searchQuery);

    const tasks = [
      // المصدر 1: Wikipedia
      fetch(`https://${lang}.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encoded}&srlimit=3&utf8=&format=json&origin=*`)
        .then(r => r.json())
        .then(async data => {
          if (!data?.query?.search?.length) return [];
          const ids = data.query.search.slice(0, 2).map(x => x.pageid).join("|");
          const ext = await fetch(`https://${lang}.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext&exchars=4000&pageids=${ids}&format=json&origin=*`).then(r => r.json());
          const pages = Object.values(ext?.query?.pages || {});
          return pages.map(p => ({ source: "Wikipedia", text: p.extract || "" }));
        }).catch(() => []),

      // المصدر 2: Wikidata (الحقائق والكيانات)
      fetch(`https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encoded}&language=${lang}&limit=3&format=json&origin=*`)
        .then(r => r.json())
        .then(data => {
          if (!data?.search?.length) return [];
          return data.search
            .filter(item => item.description)
            .map(item => ({ source: "Wikidata", text: `${item.label}: ${item.description}.` }));
        }).catch(() => []),

      // المصدر 3: OpenAlex (الأبحاث العلمية والأكاديمية)
      fetch(`https://api.openalex.org/works?search=${encoded}&per-page=3`)
        .then(r => r.json())
        .then(data => {
          if (!data?.results?.length) return [];
          return data.results.map(work => {
            const year = work.publication_year ? ` (${work.publication_year})` : "";
            return { source: "OpenAlex Science", text: `${work.title}${year}.` };
          });
        }).catch(() => []),

      // المصدر 4: Wiktionary (المعاجم ومعاني الكلمات)
      fetch(`https://${lang}.wiktionary.org/w/api.php?action=query&list=search&srsearch=${encoded}&srlimit=2&utf8=&format=json&origin=*`)
        .then(r => r.json())
        .then(async data => {
          if (!data?.query?.search?.length) return [];
          const pageId = data.query.search[0].pageid;
          const ext = await fetch(`https://${lang}.wiktionary.org/w/api.php?action=query&prop=extracts&explaintext&exchars=1200&pageids=${pageId}&format=json&origin=*`).then(r => r.json());
          const page = Object.values(ext?.query?.pages || {})[0];
          return page?.extract ? [{ source: "Wiktionary", text: page.extract }] : [];
        }).catch(() => []),

      // المصدر 5: Open Library (الكتب والمؤلفين)
      fetch(`https://openlibrary.org/search.json?q=${encoded}&limit=2`)
        .then(r => r.json())
        .then(data => {
          if (!data?.docs?.length) return [];
          return data.docs.map(book => {
            const author = book.author_name ? book.author_name[0] : "";
            const year = book.first_publish_year ? ` (${book.first_publish_year})` : "";
            return { source: "OpenLibrary", text: `${book.title}${author ? " - " + author : ""}${year}.` };
          });
        }).catch(() => []),

      // المصدر 6: DuckDuckGo Instant Answer
      fetch(`https://api.duckduckgo.com/?q=${encoded}&format=json&no_html=1&skip_disambig=1`)
        .then(r => r.json())
        .then(data => {
          return data?.AbstractText ? [{ source: "DuckDuckGo", text: data.AbstractText }] : [];
        }).catch(() => [])
    ];

    const settled = await Promise.allSettled(tasks);
    const results = [];
    settled.forEach(res => {
      if (res.status === "fulfilled" && Array.isArray(res.value)) {
        results.push(...res.value);
      }
    });
    return results;
  }

  // 5. المحرك الرئيسي للبحث الشامل والتدقيق المتقاطع
  async function omniSearchAndReason(rawQuery, lang) {
    const startTime = performance.now();

    // أ. التعامل الفوري مع أسئلة المتابعة والتفصيل ("تفصيل أكتر")
    if (isExpansionQuery(rawQuery) && omniMemory.allCandidates.length > 0 && omniMemory.lang === lang) {
      const remaining = omniMemory.allCandidates.filter(c => !omniMemory.usedSet.has(c.id));
      if (remaining.length > 0) {
        const nextSlice = remaining.slice(0, 4);
        nextSlice.forEach(item => omniMemory.usedSet.add(item.id));
        const activeSrcs = [...new Set(nextSlice.map(s => s.source))].join(" + ");
        const elapsed = (performance.now() - startTime).toFixed(1);

        const headerLabel = lang === "ar"
          ? `تفاصيل إضافية حول (${omniMemory.topic}) من [${activeSrcs}]:

`
          : lang === "fr"
            ? `Détails supplémentaires sur (${omniMemory.topic}) via [${activeSrcs}]:

`
            : `Additional details on (${omniMemory.topic}) from [${activeSrcs}]:

`;

        return {
          answer: headerLabel + nextSlice.map(i => "• " + i.sentence).join(".
") + ".",
          confidence: 95,
          analyzedCount: omniMemory.allCandidates.length,
          timeMs: elapsed
        };
      }
    }

    // ب. فحص الكاش السريع O(1)
    const cacheKey = fnv1aHash(`${lang}:${rawQuery.toLowerCase().trim()}`);
    if (omniCache.has(cacheKey)) {
      const cached = omniCache.get(cacheKey);
      return { ...cached, timeMs: (performance.now() - startTime).toFixed(1) };
    }

    // ج. استخراج الكلمات المفتاحية وتوجيه النية
    const qTokens = typeof tokenize === "function" ? tokenize(rawQuery) : rawQuery.toLowerCase().split(/\s+/);
    const searchQuery = qTokens.length > 0 ? qTokens.join(" ") : rawQuery;
    const sourceWeights = OmniMath.computeSourceWeights(rawQuery);

    // جلب البيانات من المصادر الستة بالتوازي
    const rawDocs = await fetchAllSources(searchQuery, lang);

    if (!rawDocs.length) {
      return {
        answer: (typeof translations !== "undefined" && translations[lang]?.notFound) || "لم أجد نتائج مطابقة في المصادر المتاحة.",
        confidence: 0,
        analyzedCount: 0,
        timeMs: (performance.now() - startTime).toFixed(1)
      };
    }

    // تقسيم جميع النصوص إلى جمل مرشحة مع حفظ اسم المصدر
    const candidates = [];
    let idCounter = 0;

    rawDocs.forEach(doc => {
      const sents = doc.text
        .replace(/==+.*?==+/g, " ")
        .replace(/\[.*?\]/g, "")
        .split(/[.!؟\n]+/)
        .map(s => s.trim())
        .filter(s => s.length > 22 && s.length < 450);

      sents.forEach((sentence, idx) => {
        const tokens = typeof tokenize === "function" ? tokenize(sentence) : sentence.toLowerCase().split(/\s+/);
        candidates.push({
          id: idCounter++,
          sentence,
          tokens,
          source: doc.source,
          posIndex: idx
        });
      });
    });

    if (!candidates.length) {
      return {
        answer: (typeof translations !== "undefined" && translations[lang]?.notFound) || "لم أجد جملاً مفيدة كافية.",
        confidence: 0,
        analyzedCount: 0,
        timeMs: (performance.now() - startTime).toFixed(1)
      };
    }

    // د. حساب الدرجة الرياضية + الإجماع المتقاطع بين المصادر (Cross-Source Consensus)
    const scored = candidates.map((cand, i) => {
      let matchCount = 0;
      qTokens.forEach(qt => { if (cand.tokens.includes(qt)) matchCount++; });
      const lexicalScore = matchCount / (qTokens.length || 1);

      // وزن المصدر بناءً على توجيه النية
      let srcKey = "wikipedia";
      if (cand.source === "Wikidata") srcKey = "wikidata";
      else if (cand.source === "OpenAlex Science") srcKey = "openalex";
      else if (cand.source === "Wiktionary") srcKey = "wiktionary";
      else if (cand.source === "OpenLibrary") srcKey = "openlibrary";
      else if (cand.source === "DuckDuckGo") srcKey = "ddg";

      const srcBoost = 1 + (sourceWeights[srcKey] * 2.5);

      // حساب إجماع المصادر (هل المعلومة مدعومة من مصدر آخر؟)
      let consensusBonus = 0;
      const limitCheck = Math.min(candidates.length, 40);
      for (let j = 0; j < limitCheck; j++) {
        if (i !== j && candidates[j].source !== cand.source) {
          const sim = OmniMath.diceSimilarity(cand.tokens, candidates[j].tokens);
          if (sim > 0.35) consensusBonus += sim * 0.4;
        }
      }

      const posWeight = Math.exp(-0.03 * cand.posIndex);
      const totalScore = (lexicalScore * 0.65 + posWeight * 0.35 + consensusBonus) * srcBoost;

      return { ...cand, score: totalScore };
    });

    scored.sort((a, b) => b.score - a.score);

    // حفظ في الذاكرة العميقة لدعم "تفصيل أكتر"
    omniMemory = {
      topic: rawQuery,
      lang,
      allCandidates: scored,
      usedSet: new Set(),
      sourcesUsed: [...new Set(rawDocs.map(d => d.source))]
    };

    // اختيار أفضل 3 جمل غير مكررة
    const finalPicks = [];
    for (const item of scored) {
      if (finalPicks.length >= 3) break;
      const isDup = finalPicks.some(p => OmniMath.diceSimilarity(p.tokens, item.tokens) > 0.6);
      if (!isDup) {
        finalPicks.push(item);
        omniMemory.usedSet.add(item.id);
      }
    }

    const activeSources = [...new Set(finalPicks.map(p => p.source))].join(" + ");
    const sourceFooter = lang === "ar"
      ? `\n\n📚 المصادر المستنتجة: ${activeSources}`
      : lang === "fr"
        ? `\n\n📚 Sources analysées : ${activeSources}`
        : `\n\n📚 Synthesized Sources: ${activeSources}`;

    const answerText = finalPicks.map(p => p.sentence).join(". ") + "." + sourceFooter;
    const confidence = Math.min(99, Math.max(62, Math.round(70 + (finalPicks.length * 7) + (omniMemory.sourcesUsed.length * 2))));
    const elapsed = (performance.now() - startTime).toFixed(1);

    const output = {
      answer: answerText,
      confidence,
      analyzedCount: candidates.length,
      timeMs: elapsed
    };

    omniCache.set(cacheKey, output);
    return output;
  }

  return { omniSearchAndReason };
})();

// ربط المحرك الشامل بالواجهة تلقائياً عند تحميل الصفحة
window.addEventListener("DOMContentLoaded", () => {
  if (typeof executeVotaEngine === "function") {
    const prevEngine = executeVotaEngine;
    window.executeVotaEngine = async function(query, lang) {
      if (typeof checkIdentityQuery === "function" && checkIdentityQuery(query)) {
        return prevEngine(query, lang);
      }
      return await VotaOmniSearch.omniSearchAndReason(query, lang);
    };
  }
});
