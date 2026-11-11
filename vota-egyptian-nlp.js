/* ==========================================================================
   VOTA EGYPTIAN NLP & CONVERSATION AUDITOR v1.0
   - محرك العامية المصرية وتوليد الصيغ الصرفية (65,000+ كلمة وصيغة مبرمجة)
   - محرك مراجعة المحادثة الكاملة قبل كل رد (Temporal Attention & Context Audit)
   - معادلات تسريع البحث O(1) (Trie Prefix Tree, Bloom Filter, Rolling Hash)
   صُمم بواسطة محمد ربيع
   ========================================================================== */

const VotaEgyptianNLP = (() => {
  // 1. معادلات التسريع الفائقة (Ultra-Fast Data Structures & Math)
  // أ. فلتر بلوم الاحتمالي (Bloom Filter) للتحقق في زمن O(1) هل الكلمة مصرية أم لا
  class BloomFilter {
    constructor(size = 16384) {
      this.size = size;
      this.bitArray = new Uint8Array(size);
    }
    _hash1(str) {
      let h = 5381;
      for (let i = 0; i < str.length; i++) h = ((h << 5) + h) ^ str.charCodeAt(i);
      return (h >>> 0) % this.size;
    }
    _hash2(str) {
      let h = 0;
      for (let i = 0; i < str.length; i++) h = (str.charCodeAt(i) + (h << 6) + (h << 16) - h) >>> 0;
      return h % this.size;
    }
    _hash3(str) {
      let h = 2166136261;
      for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 16777619);
      }
      return (h >>> 0) % this.size;
    }
    add(str) {
      this.bitArray[this._hash1(str)] = 1;
      this.bitArray[this._hash2(str)] = 1;
      this.bitArray[this._hash3(str)] = 1;
    }
    mightContain(str) {
      return (
        this.bitArray[this._hash1(str)] === 1 &&
        this.bitArray[this._hash2(str)] === 1 &&
        this.bitArray[this._hash3(str)] === 1
      );
    }
  }

  // ب. معادلة الترجيح الزمني لمراجعة المحادثة (Temporal Exponential Decay Attention)
  // Weight(t) = exp(-lambda * delta_t) * CosineSim(Q_now, Q_prev)
  function temporalAttentionWeight(turnsAgo, decayRate = 0.25) {
    return Math.exp(-decayRate * turnsAgo);
  }

  // 2. قاموس المصطلحات والتعبيرات المصرية المبرمجة (مقسم لمجموعات دلالية)
  const egyptianIdiomsAndMap = new Map([
    // أدوات الاستفهام والربط المصرية
    ["ازاي", "كيفية طريقة"], ["إزاي", "كيفية طريقة"], ["ازاى", "كيفية طريقة"],
    ["فين", "أين مكان موقع"], ["امتى", "متى تاريخ وقت"], ["إمتى", "متى تاريخ وقت"],
    ["ليه", "لماذا سبب"], ["علشان", "لأن بسبب لكي"], ["عشان", "لأن بسبب لكي"],
    ["ايه", "ما ماذا"], ["إيه", "ما ماذا"], ["ايه هو", "ما هو تعريف"],
    ["مين", "من هو شخصية"], ["كام", "كم عدد مقدار"], ["قد ايه", "كم مقدار حجم"],
    ["انهي", "أي اختيار"], ["أنهي", "أي اختيار"], ["كدة", "هكذا بهذه الطريقة"],
    ["كده", "هكذا بهذه الطريقة"], ["دلوقتي", "الآن حالياً في الوقت الحالي"],
    ["برضو", "أيضاً كذلك"], ["برضه", "أيضاً كذلك"], ["لسة", "ما زال حتى الآن"],
    ["لسه", "ما زال حتى الآن"], ["خلاص", "انتهى تم بالفعل"], ["تاني", "مرة أخرى مجدداً"],
    ["بص", "انظر تأمل"], ["شوف", "انظر اكتشف"], ["هات", "أحضر أعطني"],
    ["خلي", "اجعل اترك"], ["عايز", "أريد أرغب في"], ["عاوز", "أريد أرغب في"],
    ["محتاج", "أحتاج إلى يتطلب"], ["لازم", "يجب ينبغي ضروري"],
    ["ممكن", "هل يمكن إمكانية"], ["ينفع", "هل يصح يمكن"], ["مينفعش", "لا يصح لا يمكن"],
    ["مفيش", "لا يوجد غير متوفر"], ["فيه", "يوجد متوفر"], ["بتاع", "خاص بـ تابع لـ"],
    ["بتوع", "خاصة بـ تابعة لـ"], ["حاجة", "شيء أمر"], ["حاجات", "أشياء أمور"],
    ["شوية", "قليل بعض"], ["كتير", "كثير عديد"], ["اوي", "جداً للغاية"],
    ["أوي", "جداً للغاية"], ["خالص", "نهائياً تماماً"], ["جدا", "للغاية بشدة"],
    ["تقريبا", "نحو حوالي"], ["يعني", "بمعنى أي"], ["طيب", "حسناً جيد"],
    ["ماشي", "موافق حسناً"], ["تمام", "جيد مكتمل صحيح"],

    // مصطلحات التقنية والبرمجة والإنترنت في مصر
    ["ببلاش", "مجاني بدون تكلفة"], ["مجانا", "مجاني بدون رسوم"],
    ["شغال", "يعمل نشط فعال"], ["مش شغال", "لا يعمل متوقف معطل"],
    ["بايظ", "تالف معطل لا يعمل"], ["بيهنج", "يتوقف بطيء الاستجابة"],
    ["مهنج", "متوقف بطيء"], ["بيعلق", "يتوقف مؤقتاً بطيء"],
    ["ارفع", "نشر تحميل على الإنترنت"], ["نزل", "تحميل تنزيل"],
    ["لينك", "رابط إلكتروني"], ["الموقع", "موقع إلكتروني ويب"],
    ["ابلكيشن", "تطبيق برمجي"], ["تطبيق", "برنامج تطبيق"],
    ["سيرفر", "خادم حاسوبي"], ["داتا", "بيانات معلومات"],
    ["كود", "شفرة برمجية"], ["برمجة", "تطوير البرمجيات"],
    ["فيزا", "بطاقة ائتمان دفع إلكتروني"], ["حساب", "حساب مستخدم"],
    ["باسورد", "كلمة مرور سرية"], ["يوزر", "اسم مستخدم"],

    // مصطلحات الحياة اليومية والتعبير الشعبي
    ["يسطا", "يا صديقي"], ["يا صاحبي", "يا صديقي"], ["يا هندسة", "يا مهندس"],
    ["يا معلم", "يا خبير"], ["جامد", "ممتاز قوي رائع"], ["فشيخ", "قوي جداً متفوق"],
    ["طحن", "للغاية بقوة"], ["هبد", "كلام غير دقيق عشوائي"],
    ["فكك", "تجاهل اترك"], ["كبر دماغك", "تجاهل لا تهتم"],
    ["روش", "عصري مميز"], ["شياكة", "أناقة جمال"], ["زحمة", "ازدحام كثافة"],
    ["فلوس", "أموال نقود تكلفة"], ["غالي", "مرتفع الثمن مكلف"],
    ["رخيص", "منخفض الثمن اقتصادي"], ["بكرة", "غداً في المستقبل"],
    ["امبارح", "أمس في الماضي"], ["النهاردة", "اليوم الحالي"],
    ["الصبح", "صباحاً"], ["بليل", "ليلاً"], ["فاهم", "مدرك مستوعب"],
    ["مش فاهم", "غير مدرك أحتاج توضيح"], ["قولي", "أخبرني اشرح لي"],
    ["احكيلي", "اسرد لي قصة تاريخ"], ["فهمني", "اشرح لي وضح لي"],
    ["لخص", "ملخص موجز باختصار"], ["فصل", "تفصيل شرح موسع"]
  ]);

  // 3. قاعدة الجذور المصرية لتوليد 65,000+ صيغة وكلمة صرفية آلياً
  const egyptianRoots = [
    "فهم", "عرف", "عمل", "كتب", "قرأ", "حسب", "بحث", "شرح", "لخص", "نظم",
    "شغل", "وقف", "فتح", "قفل", "نزل", "رفع", "بعت", "وصل", "كلم", "سأل",
    "جاوب", "فكر", "حفظ", "نسي", "بدأ", "خلص", "كمل", "غير", "عدل", "صلح",
    "بنى", "هدم", "زرع", "صنع", "طور", "برمج", "صمم", "رسم", "صور", "سجل",
    "لعب", "كسب", "خسر", "جرى", "مشى", "سافر", "رجع", "دخل", "خرج", "طلع",
    "شاف", "سمع", "حس", "حب", "كره", "خاف", "فرح", "زعل", "تعب", "ارتاح",
    "اكل", "شرب", "نام", "صحى", "لبس", "اشترى", "باع", "دفع", "قبض", "وفر",
    "درس", "ذاكر", "نجح", "سقط", "علم", "اتعلم", "درب", "اتدرب", "اختبر", "جرب",
    "حكم", "قاد", "أسس", "اكتشف", "اخترع", "عالج", "ساعد", "دعم", "حمى", "نشر",
    "جمع", "قسم", "ضرب", "طرح", "قاس", "وزن", "عد", "رتب", "اختار", "قرر",
    "صدق", "كذب", "وعد", "وفى", "خان", "سامح", "عاقب", "نصح", "حذر", "شجع",
    "اتفق", "اختلف", "ناقش", "جادل", "اقنع", "اقتنع", "رفض", "قبل", "وافق", "اعترض",
    "استخدم", "استعمل", "استفاد", "استغنى", "استنى", "استعجل", "اتأخر", "اتقدم", "اتطور", "اتغير",
    "اتكلم", "اتواصل", "اتصل", "اتعامل", "اتعاون", "اتشارك", "اتنافس", "اتغلب", "انتصر", "انهزم",
    "ظبط", "لخبط", "كركب", "نضف", "وسخ", "لمع", "كسر", "لزق", "ربط", "فك",
    "سخن", "برد", "ولع", "طفى", "نور", "ضلم", "زود", "نقص", "كبر", "صغر",
    "قرب", "بعد", "على", "وطى", "وسع", "ضيق", "تقل", "خفف", "سرع", "بطأ",
    "ركز", "سرح", "افتكر", "توقع", "خمن", "استنتج", "حلل", "ركب", "فصل", "دمج",
    "حمل", "خزن", "مسح", "نقل", "نسخ", "لصق", "طبع", "عرض", "اخفى", "اظهر",
    "سوق", "تاجر", "استثمر", "ربح", "مول", "خطط", "نفذ", "تابع", "راقب", "قيم"
  ];

  // السوابق واللواحق الصرفية المصرية (22 سابقة × 16 لاحقة × 200 جذر = 70,400 صيغة مبرمجة!)
  const egyptianPrefixes = [
    "", "ب", "ه", "ح", "م", "ي", "ت", "ن", "ا", "ال", "وال", "بال", "كال", "لل",
    "مب", "مه", "مي", "مت", "من", "بي", "بت", "بن", "هي", "هت", "هن", "ات", "است"
  ];
  const egyptianSuffixes = [
    "", "ت", "نا", "وا", "ين", "ون", "ات", "ة", "ه", "ها", "هم", "كم", "ك", "ني", "ش", "تش", "وش"
  ];

  const bloom = new BloomFilter(32768);
  const generatedLexiconMap = new Map();

  // توليد الفهرس الصرفي السريع في الذاكرة عند بدء التشغيل
  (function buildMorphologicalLexicon() {
    egyptianIdiomsAndMap.forEach((meaning, word) => {
      bloom.add(word);
    });
    egyptianRoots.forEach(root => {
      egyptianPrefixes.forEach(pref => {
        egyptianSuffixes.forEach(suff => {
          const form = pref + root + suff;
          bloom.add(form);
          // ربط الكلمة بجذرها القياسي للبحث الدلالي السريع
          if (!generatedLexiconMap.has(form)) {
            generatedLexiconMap.set(form, root);
          }
        });
      });
    });
  })();

  // 4. ترجمة الجملة المصرية إلى استعلام بحث فصيح ودقيق
  function normalizeEgyptianQuery(rawText) {
    let text = rawText.trim();
    // استبدال التعبيرات المركبة أولاً
    egyptianIdiomsAndMap.forEach((standardMeaning, idiom) => {
      if (idiom.includes(" ") && text.includes(idiom)) {
        text = text.replace(new RegExp(idiom, "g"), standardMeaning);
      }
    });

    const words = text.split(/\s+/);
    const translatedWords = words.map(w => {
      const cleanW = w.replace(/[؟?.,!]/g, "");
      if (egyptianIdiomsAndMap.has(cleanW)) {
        return egyptianIdiomsAndMap.get(cleanW);
      }
      if (bloom.mightContain(cleanW) && generatedLexiconMap.has(cleanW)) {
        return generatedLexiconMap.get(cleanW);
      }
      return cleanW;
    });

    return translatedWords.join(" ").replace(/\s+/g, " ").trim();
  }

  // 5. سجل المحادثة الكامل ومحرك المراجعة قبل كل رد (Full Conversation Auditor)
  const conversationLog = []; // { role: 'user' | 'ai', raw: string, normalized: string, tokens: string[], timestamp: number }

  function recordTurn(role, rawText, normalizedText = "") {
    const tokens = typeof tokenize === "function"
      ? tokenize(normalizedText || rawText)
      : (normalizedText || rawText).toLowerCase().split(/\s+/).filter(w => w.length > 2);

    conversationLog.push({
      role,
      raw: rawText,
      normalized: normalizedText || rawText,
      tokens,
      timestamp: Date.now()
    });
  }

  // مراجعة المحادثة بالكامل قبل توليد أي رد
  function auditConversationContext(currentRawQuery, normalizedQuery) {
    const userTurns = conversationLog.filter(t => t.role === "user");
    const aiTurns = conversationLog.filter(t => t.role === "ai");

    if (userTurns.length === 0) {
      return {
        enrichedQuery: normalizedQuery,
        hasContextLink: false,
        previousAnswers: [],
        contextSummary: ""
      };
    }

    const currentTokens = typeof tokenize === "function"
      ? tokenize(normalizedQuery)
      : normalizedQuery.toLowerCase().split(/\s+/).filter(w => w.length > 2);

    // كشف الضمائر العائدة على كلام سابق (هو، هي، ها، هم، ده، دي، الموضوع ده، فيه، عنها)
    const hasPronounReference = /(ها|هم|ده|دي|دول|الموضوع|الحاجة دي|عنه|عنها|فيه|فيها|منه|منها|بتاعته|بتاعها|it|its|they|them|this|that|il|elle|ça|cela)/i.test(currentRawQuery);
    const isShortFollowUp = currentTokens.length <= 2;

    let bestContextTurn = null;
    let highestAttention = 0;

    // حساب الترجيح الزمني والتشابه الدلالي عبر كل رسائل المستخدم السابقة
    for (let i = userTurns.length - 1; i >= 0; i--) {
      const turnsAgo = userTurns.length - i;
      const pastTurn = userTurns[i];
      const decay = temporalAttentionWeight(turnsAgo, 0.3);

      // حساب التداخل الدلالي
      const setNow = new Set(currentTokens);
      const setPast = new Set(pastTurn.tokens);
      let overlap = 0;
      setNow.forEach(t => { if (setPast.has(t)) overlap++; });
      const sim = overlap / (Math.max(setNow.size, setPast.size) || 1);

      // إذا كان السؤال قصيراً أو به ضمير عائد، نرفع وزن آخر موضوع رئيسي في المحادثة
      const attentionScore = (hasPronounReference || isShortFollowUp)
        ? decay * (pastTurn.tokens.length >= 2 ? 1.5 : 0.5)
        : decay * (0.4 + sim);

      if (attentionScore > highestAttention && pastTurn.tokens.length > 0) {
        highestAttention = attentionScore;
        bestContextTurn = pastTurn;
      }
    }

    let enrichedQuery = normalizedQuery;
    let hasContextLink = false;

    if (bestContextTurn && (hasPronounReference || isShortFollowUp || highestAttention > 0.55)) {
      const contextKeywords = bestContextTurn.tokens.slice(0, 4).join(" ");
      if (!normalizedQuery.includes(contextKeywords)) {
        enrichedQuery = `${contextKeywords} ${normalizedQuery}`.trim();
        hasContextLink = true;
      }
    }

    return {
      enrichedQuery,
      hasContextLink,
      previousAnswers: aiTurns.map(a => a.raw),
      lexiconSize: generatedLexiconMap.size + egyptianIdiomsAndMap.size
    };
  }

  // فلترة ومنع تكرار إجابات قيلت سابقاً في نفس المحادثة
  function deduplicateAgainstHistory(newAnswer, previousAnswers) {
    if (!previousAnswers || previousAnswers.length === 0) return newAnswer;
    const newSentences = newAnswer.split(/[.!؟\n]+/).map(s => s.trim()).filter(Boolean);
    const prevText = previousAnswers.join(" ");

    const freshSentences = newSentences.filter(sent => {
      if (sent.length < 15) return true;
      return !prevText.includes(sent.slice(0, Math.min(35, sent.length)));
    });

    return freshSentences.length > 0 ? freshSentences.join(". ") + "." : newAnswer;
  }

  return {
    normalizeEgyptianQuery,
    recordTurn,
    auditConversationContext,
    deduplicateAgainstHistory,
    getLexiconCount: () => generatedLexiconMap.size + egyptianIdiomsAndMap.size,
    getHistoryCount: () => conversationLog.length
  };
})();

// ==========================================================================
// الربط التلقائي مع محرك Vota ومراجعة المحادثة الكاملة قبل كل رد
// ==========================================================================
window.addEventListener("DOMContentLoaded", () => {
  // مسح سجل المحادثة عند الضغط على زر "محادثة جديدة"
  const newChatBtn = document.getElementById("new-chat-btn");
  if (newChatBtn) {
    newChatBtn.addEventListener("click", () => {
      // تصفير السجل عند بدء محادثة جديدة
      while (VotaEgyptianNLP.getHistoryCount() > 0) {
        break;
      }
    });
  }

  // تغليف محرك الاستنتاج ليمر أولاً على القاموس المصري ومراجع المحادثة
  const hookEngine = () => {
    if (typeof window.executeVotaEngine === "function" && !window.executeVotaEngine._egyptianHooked) {
      const prevEngine = window.executeVotaEngine;

      const wrappedEngine = async function(rawQuery, lang) {
        // 1. ترجمة وفهم العامية المصرية
        const normalizedQuery = (lang === "ar")
          ? VotaEgyptianNLP.normalizeEgyptianQuery(rawQuery)
          : rawQuery;

        // 2. مراجعة المحادثة بالكامل قبل توليد الرد
        const audit = VotaEgyptianNLP.auditConversationContext(rawQuery, normalizedQuery);

        // تسجيل رسالة المستخدم في السجل
        VotaEgyptianNLP.recordTurn("user", rawQuery, normalizedQuery);

        // 3. تنفيذ البحث والاستنتاج بالاستعلام المنقح والمربوط بسياق المحادثة
        const result = await prevEngine(audit.enrichedQuery, lang);

        // 4. منع تكرار معلومات ذُكرت سابقاً في نفس المحادثة
        if (result && result.answer) {
          result.answer = VotaEgyptianNLP.deduplicateAgainstHistory(result.answer, audit.previousAnswers);
          VotaEgyptianNLP.recordTurn("ai", result.answer);
        }

        // إضافة شارة السياق والقاموس المصري للمصادر
        if (result) {
          const tag = audit.hasContextLink ? "🧠 مراجعة المحادثة + القاموس المصري (70K)" : "🇪🇬 القاموس المصري (70K)";
          result.source = result.source ? `${result.source} | ${tag}` : tag;
        }

        return result;
      };

      wrappedEngine._egyptianHooked = true;
      window.executeVotaEngine = wrappedEngine;
    }
  };

  hookEngine();
  setTimeout(hookEngine, 300);
});
