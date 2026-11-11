/* =========================================================
   Vota AI - Math Core v2.5 (Complete & Verified)
   Designed by Mohamed Rabie
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const translations = {
    ar: {
      dir: "rtl",
      newChat: "محادثة جديدة",
      specsTitle: "معمارية المحرك الرياضي",
      memActive: "نشطة",
      memPaused: "متوقفة",
      statusReady: "النظام جاهز للمعالجة الرياضية الفورية O(1)",
      statusComputing: "جاري البحث وتطبيق معادلات BM25 و TextRank...",
      welcome: "أهلاً بك! أنا نموذج Vota الرياضي، صُممت بواسطة محمد ربيع. أبحث في الويب وأحلل البيانات بمعادلات رياضية معقدة بسرعة فائقة.",
      placeholder: "اسأل Vota أي شيء...",
      send: "إرسال",
      footer: "صُمم بواسطة محمد ربيع",
      bottomCredit: "Vota Math Engine • صُمم بواسطة محمد ربيع",
      copy: "📋 نسخ",
      copied: "✅ تم النسخ",
      notFound: "لم أجد بيانات كافية في الويب تطابق العتبة الرياضية لسؤالك. جرب صياغة السؤال بكلمات مفتاحية أوضح.",
      identity: "أنا نموذج الذكاء الاصطناعي الرياضي Vota (نواة Math-LLM)، صُممت وطُوّرت بالكامل بواسطة المطور محمد ربيع. أعتمد على معادلات الاحتمالات والمصفوفات للبحث والاستنتاج الفوري دون الاعتماد على أي نماذج خارجية!",
      chips: {
        who: "من أنت ومن صممك؟",
        ai: "ما هو الذكاء الاصطناعي؟",
        space: "ما هي الثقوب السوداء؟",
        history: "تاريخ الحضارة المصرية"
      }
    },
    en: {
      dir: "ltr",
      newChat: "New Chat",
      specsTitle: "Math Engine Architecture",
      memActive: "Active",
      memPaused: "Paused",
      statusReady: "System ready for O(1) mathematical inference",
      statusComputing: "Searching web & computing BM25 + TextRank matrices...",
      welcome: "Welcome! I am the Vota Mathematical Model, designed by Mohamed Rabie. I analyze web knowledge using complex equations at ultra-high speed.",
      placeholder: "Ask Vota anything...",
      send: "Send",
      footer: "Designed by Mohamed Rabie",
      bottomCredit: "Vota Math Engine • Designed by Mohamed Rabie",
      copy: "📋 Copy",
      copied: "✅ Copied",
      notFound: "Insufficient web data matched the mathematical confidence threshold. Try clearer keywords.",
      identity: "I am Vota (Math-LLM Core), an independent mathematical AI model designed and engineered by Mohamed Rabie. I rely on probabilistic matrices and graph centrality to reason and extract answers instantly!",
      chips: {
        who: "Who are you & who made you?",
        ai: "What is Artificial Intelligence?",
        space: "What are Black Holes?",
        history: "History of Ancient Egypt"
      }
    },
    fr: {
      dir: "ltr",
      newChat: "Nouvelle discussion",
      specsTitle: "Architecture Mathématique",
      memActive: "Active",
      memPaused: "En pause",
      statusReady: "Système prêt pour l'inférence mathématique O(1)",
      statusComputing: "Recherche et calcul des matrices BM25 & TextRank...",
      welcome: "Bienvenue ! Je suis le modèle mathématique Vota, conçu par Mohamed Rabie. J'analyse le web grâce à des équations complexes à haute vitesse.",
      placeholder: "Demandez n'importe quoi à Vota...",
      send: "Envoyer",
      footer: "Conçu par Mohamed Rabie",
      bottomCredit: "Moteur Mathématique Vota • Conçu par Mohamed Rabie",
      copy: "📋 Copier",
      copied: "✅ Copié",
      notFound: "Aucune donnée web suffisante ne correspond au seuil mathématique.",
      identity: "Je suis Vota (Noyau Math-LLM), un modèle d'IA mathématique conçu par le développeur Mohamed Rabie. J'utilise des matrices probabilistes pour analyser et répondre instantanément !",
      chips: {
        who: "Qui es-tu et qui t'a créé ?",
        ai: "Qu'est-ce que l'intelligence artificielle ?",
        space: "Que sont les trous noirs ?",
        history: "Histoire de l'Égypte ancienne"
      }
    }
  };

  const stopWords = new Set([
    "ما", "هو", "هي", "هم", "من", "في", "على", "عن", "هل", "كيف", "متى", "أين", "لماذا", "و", "أو", "ثم", "ان", "أن", "كان", "كانت", "هذا", "هذه", "التي", "الذي",
    "what", "is", "are", "was", "were", "who", "how", "when", "where", "why", "the", "a", "an", "in", "on", "of", "to", "for", "with", "and", "or",
    "le", "la", "les", "un", "une", "des", "de", "du", "est", "sont", "qui", "quoi", "comment", "quand", "où", "pourquoi", "et", "ou", "dans"
  ]);

  class LRUCache {
    constructor(limit = 40) {
      this.limit = limit;
      this.cache = new Map();
    }
    get(key) {
      if (!this.cache.has(key)) return null;
      const val = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, val);
      return val;
    }
    set(key, val) {
      if (this.cache.has(key)) this.cache.delete(key);
      else if (this.cache.size >= this.limit) {
        this.cache.delete(this.cache.keys().next().value);
      }
      this.cache.set(key, val);
    }
  }

  const votaCache = new LRUCache(40);
  let contextTokensMemory = [];
  let isMemoryEnabled = true;

  function stemWord(word) {
    let w = word.toLowerCase().trim();
    w = w.replace(/^(ال|وال|بال|كال|فال|لل)/, "");
    w = w.replace(/(ون|ين|ات|ان|ية|ها|هم|كم|نا)$/, "");
    if (w.length > 4) {
      w = w.replace(/(ing|ed|es|s|tion|ment|ique)$/, "");
    }
    return w;
  }

  function tokenize(text) {
    return text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s]/gu, " ")
      .split(/\s+/)
      .filter(w => w.length > 1 && !stopWords.has(w))
      .map(stemWord)
      .filter(w => w.length > 1);
  }

  function buildInvertedIndex(sentencesTokens) {
    const index = new Map();
    sentencesTokens.forEach((tokens, docId) => {
      tokens.forEach(token => {
        if (!index.has(token)) index.set(token, new Set());
        index.get(token).add(docId);
      });
    });
    return index;
  }

  function computeBM25(queryTokens, sentencesTokens, invertedIndex) {
    const N = sentencesTokens.length;
    const avgdl = sentencesTokens.reduce((sum, s) => sum + s.length, 0) / (N || 1);
    const k1 = 1.6;
    const b = 0.75;
    const scores = new Float64Array(N);

    queryTokens.forEach(q => {
      const matchingDocs = invertedIndex.get(q);
      if (!matchingDocs) return;
      const df = matchingDocs.size;
      const idf = Math.log(((N - df + 0.5) / (df + 0.5)) + 1);

      matchingDocs.forEach(docId => {
        const docTokens = sentencesTokens[docId];
        const docLen = docTokens.length;
        let tf = 0;
        for (let i = 0; i < docLen; i++) {
          if (docTokens[i] === q) tf++;
        }
        const num = tf * (k1 + 1);
        const den = tf + k1 * (1 - b + b * (docLen / (avgdl || 1)));
        scores[docId] += idf * (num / (den || 1));
      });
    });

    return scores;
  }

  function computeTextRank(sentencesTokens) {
    const n = Math.min(sentencesTokens.length, 45);
    const matrix = Array.from({ length: n }, () => new Float32Array(n));

    for (let i = 0; i < n; i++) {
      const setA = new Set(sentencesTokens[i]);
      if (setA.size === 0) continue;
      for (let j = i + 1; j < n; j++) {
        const setB = new Set(sentencesTokens[j]);
        if (setB.size === 0) continue;
        let intersection = 0;
        setA.forEach(x => { if (setB.has(x)) intersection++; });
        const union = setA.size + setB.size - intersection;
        const sim = union === 0 ? 0 : intersection / union;
        matrix[i][j] = sim;
        matrix[j][i] = sim;
      }
    }

    let ranks = new Float32Array(n).fill(1 / (n || 1));
    const damping = 0.85;

    for (let iter = 0; iter < 12; iter++) {
      const newRanks = new Float32Array(n).fill((1 - damping) / (n || 1));
      for (let i = 0; i < n; i++) {
        let rowSum = 0;
        for (let k = 0; k < n; k++) rowSum += matrix[i][k];
        if (rowSum === 0) continue;
        for (let j = 0; j < n; j++) {
          if (matrix[i][j] > 0) {
            newRanks[j] += damping * (matrix[i][j] / rowSum) * ranks[i];
          }
        }
      }
      ranks = newRanks;
    }
    return ranks;
  }

  function selectDiverseSentences(rankedItems, maxSentences = 3) {
    const selected = [];
    for (const candidate of rankedItems) {
      if (selected.length >= maxSentences) break;
      const candSet = new Set(candidate.tokens);
      let isRedundant = false;

      for (const chosen of selected) {
        const chosenSet = new Set(chosen.tokens);
        let overlap = 0;
        candSet.forEach(t => { if (chosenSet.has(t)) overlap++; });
        const similarity = overlap / (Math.min(candSet.size, chosenSet.size) || 1);
        if (similarity > 0.65) {
          isRedundant = true;
          break;
        }
      }
      if (!isRedundant) selected.push(candidate);
    }
    return selected;
  }

  function checkIdentityQuery(query) {
    const q = query.toLowerCase().trim();
    const patterns = [
      "من انت", "من أنت", "مين انت", "انت مين", "عرفني بنفسك", "عرف نفسك",
      "ما اسمك", "اسمك ايه", "من صممك", "من صنعك", "من برمجك", "من مطورك",
      "who are you", "what is your name", "who made you", "who created you", "who designed you",
      "qui es-tu", "qui es tu", "quel est ton nom", "qui t'a créé", "qui t'a conçu"
    ];
    return patterns.some(p => q.includes(p));
  }

  async function executeVotaEngine(rawQuery, lang) {
    const startTime = performance.now();

    if (checkIdentityQuery(rawQuery)) {
      const elapsed = (performance.now() - startTime).toFixed(1);
      return {
        answer: translations[lang].identity,
        confidence: 100,
        analyzedCount: 1,
        timeMs: elapsed,
        source: "Vota Core Identity"
      };
    }

    const cacheKey = `${lang}:${rawQuery.toLowerCase().trim()}`;
    const cachedResult = votaCache.get(cacheKey);
    if (cachedResult) {
      const elapsed = (performance.now() - startTime).toFixed(1);
      return { ...cachedResult, timeMs: elapsed, source: "LRU Cache ⚡" };
    }

    let currentTokens = tokenize(rawQuery);
    if (currentTokens.length === 0) {
      currentTokens = rawQuery.toLowerCase().split(/\s+/).filter(Boolean);
    }

    const effectiveTokens = (isMemoryEnabled && currentTokens.length <= 2 && contextTokensMemory.length > 0)
      ? [...new Set([...contextTokensMemory.slice(0, 3), ...currentTokens])]
      : currentTokens;

    if (isMemoryEnabled && currentTokens.length > 0) {
      contextTokensMemory = currentTokens;
    }

    const searchQuery = effectiveTokens.join(" ");

    const wikiSearchUrl = `https://${lang}.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchQuery)}&srlimit=4&utf8=&format=json&origin=*`;
    const ddgUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(searchQuery)}&format=json&no_html=1&skip_disambig=1`;

    const [wikiRes, ddgRes] = await Promise.allSettled([
      fetch(wikiSearchUrl).then(r => r.json()),
      fetch(ddgUrl).then(r => r.json())
    ]);

    let collectedText = "";

    if (ddgRes.status === "fulfilled" && ddgRes.value && ddgRes.value.AbstractText) {
      collectedText += ddgRes.value.AbstractText + ". ";
    }

    if (wikiRes.status === "fulfilled" && wikiRes.value?.query?.search?.length > 0) {
      const pageIds = wikiRes.value.query.search.slice(0, 3).map(p => p.pageid).join("|");
      const extractUrl = `https://${lang}.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&pageids=${pageIds}&format=json&origin=*`;
      const extractData = await fetch(extractUrl).then(r => r.json());
      if (extractData?.query?.pages) {
        const pagesText = Object.values(extractData.query.pages).map(p => p.extract || "").join(" ");
        collectedText += pagesText;
      }
    }

    const rawSentences = collectedText
      .replace(/\[.*?\]/g, "")
      .split(/[.!؟\n]+/)
      .map(s => s.trim())
      .filter(s => s.length > 28 && s.length < 450);

    if (rawSentences.length === 0) {
      const elapsed = (performance.now() - startTime).toFixed(1);
      return {
        answer: translations[lang].notFound,
        confidence: 0,
        analyzedCount: 0,
        timeMs: elapsed,
        source: "Web Matrix"
      };
    }

    const sentencesTokens = rawSentences.map(s => tokenize(s));
    const invertedIndex = buildInvertedIndex(sentencesTokens);

    const bm25Scores = computeBM25(effectiveTokens, sentencesTokens, invertedIndex);
    const textRankScores = computeTextRank(sentencesTokens);

    const maxBm25 = Math.max(...bm25Scores, 0.0001);
    const maxRank = Math.max(...textRankScores, 0.0001);

    const rankedItems = rawSentences.map((sentence, idx) => {
      const normBm25 = bm25Scores[idx] / maxBm25;
      const normRank = (textRankScores[idx] || 0) / maxRank;
      const combinedScore = (normBm25 * 0.72) + (normRank * 0.28);
      return {
        sentence,
        tokens: sentencesTokens[idx],
        score: combinedScore,
        rawBm25: bm25Scores[idx]
      };
    });

    rankedItems.sort((a, b) => b.score - a.score);

    const topDiverse = selectDiverseSentences(rankedItems, 3);
    const finalAnswer = topDiverse.map(item => item.sentence).join(". ") + ".";

    const topRawScore = topDiverse[0]?.rawBm25 || 0;
    const confidence = Math.min(99, Math.max(55, Math.round((1 / (1 + Math.exp(-0.6 * (topRawScore - 1.2)))) * 100)));
    const elapsed = (performance.now() - startTime).toFixed(1);

    const resultObj = {
      answer: finalAnswer,
      confidence,
      analyzedCount: rawSentences.length,
      timeMs: elapsed,
      source: "BM25 + TextRank"
    };

    votaCache.set(cacheKey, resultObj);
    return resultObj;
  }

  // عناصر الواجهة
  const sidebar = document.getElementById("sidebar");
  const menuToggleBtn = document.getElementById("menu-toggle-btn");
  const closeSidebarBtn = document.getElementById("close-sidebar-btn");
  const newChatBtn = document.getElementById("new-chat-btn");
  const memoryBtn = document.getElementById("memory-btn");
  const langSelect = document.getElementById("language-select");
  const statusBar = document.getElementById("status-bar");
  const statusText = document.getElementById("status-text");
  const chatBox = document.getElementById("chat-box");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");
  const interactiveLogo = document.getElementById("vota-interactive-logo");

  function triggerLogoBoost(durationMs = 1500) {
    const logo = document.getElementById("vota-interactive-logo");
    if (!logo) return;
    logo.classList.add("active-boost");
    setTimeout(() => logo.classList.remove("active-boost"), durationMs);
  }

  if (interactiveLogo) {
    interactiveLogo.addEventListener("click", () => triggerLogoBoost(1200));
  }

  if (menuToggleBtn && sidebar) {
    menuToggleBtn.addEventListener("click", () => sidebar.classList.toggle("open"));
  }
  if (closeSidebarBtn && sidebar) {
    closeSidebarBtn.addEventListener("click", () => sidebar.classList.remove("open"));
  }

  if (memoryBtn) {
    memoryBtn.addEventListener("click", () => {
      isMemoryEnabled = !isMemoryEnabled;
      memoryBtn.classList.toggle("active", isMemoryEnabled);
      const lang = langSelect.value;
      const memLabel = document.getElementById("memory-status-label");
      if (memLabel) {
        memLabel.textContent = isMemoryEnabled ? translations[lang].memActive : translations[lang].memPaused;
      }
      if (!isMemoryEnabled) contextTokensMemory = [];
    });
  }

  function bindPromptCards() {
    document.querySelectorAll(".prompt-card").forEach(card => {
      card.addEventListener("click", () => {
        const textEl = card.querySelector(".card-text");
        if (textEl) {
          userInput.value = textEl.textContent;
          handleUserSubmit();
        }
      });
    });
  }

  function resetWorkspace() {
    const lang = langSelect.value;
    const t = translations[lang];
    contextTokensMemory = [];

    chatBox.innerHTML = `
      <div id="hero-welcome" class="hero-welcome">
        <div id="vota-interactive-logo" class="vota-logo-stage" title="Vota Core">
          <div class="ring ring-1"></div>
          <div class="ring ring-2"></div>
          <div class="ring ring-3"></div>
          <div class="plasma-core"></div>
        </div>
        <h2 class="hero-title">Vota AI</h2>
        <p id="welcome-msg" class="hero-subtitle">${t.welcome}</p>
        <div id="suggestions" class="prompt-grid">
          <button class="prompt-card" data-key="who"><span class="card-icon">🤖</span><span class="card-text">${t.chips.who}</span></button>
          <button class="prompt-card" data-key="ai"><span class="card-icon">🧬</span><span class="card-text">${t.chips.ai}</span></button>
          <button class="prompt-card" data-key="space"><span class="card-icon">🌌</span><span class="card-text">${t.chips.space}</span></button>
          <button class="prompt-card" data-key="history"><span class="card-icon">🏛️</span><span class="card-text">${t.chips.history}</span></button>
        </div>
      </div>
    `;

    const newLogo = document.getElementById("vota-interactive-logo");
    if (newLogo) newLogo.addEventListener("click", () => triggerLogoBoost(1200));
    bindPromptCards();
    if (sidebar) sidebar.classList.remove("open");
  }

  if (newChatBtn) {
    newChatBtn.addEventListener("click", resetWorkspace);
  }

  if (langSelect) {
    langSelect.addEventListener("change", () => {
      const lang = langSelect.value;
      const t = translations[lang];

      document.documentElement.lang = lang;
      document.documentElement.dir = t.dir;
      
      const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
      setText("new-chat-text", t.newChat);
      setText("engine-specs-title", t.specsTitle);
      setText("memory-status-label", isMemoryEnabled ? t.memActive : t.memPaused);
      setText("status-text", t.statusReady);
      setText("send-text", t.send);
      setText("footer-text", t.footer);
      setText("bottom-credit", t.bottomCredit);
      setText("welcome-msg", t.welcome);

      if (userInput) userInput.placeholder = t.placeholder;

      document.querySelectorAll(".prompt-card").forEach(card => {
        const key = card.getAttribute("data-key");
        const textEl = card.querySelector(".card-text");
        if (textEl && t.chips[key]) textEl.textContent = t.chips[key];
      });
    });
  }

  bindPromptCards();

  function appendUserMessage(text) {
    const hero = document.getElementById("hero-welcome");
    if (hero) hero.remove();

    const msgDiv = document.createElement("div");
    msgDiv.className = "message user-msg";
    msgDiv.textContent = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function appendAiResponse(resultObj, lang) {
    const t = translations[lang];
    const msgDiv = document.createElement("div");
    msgDiv.className = "message ai-msg";

    const contentDiv = document.createElement("div");
    contentDiv.className = "msg-content";
    contentDiv.textContent = resultObj.answer;
    msgDiv.appendChild(contentDiv);

    const metricsDiv = document.createElement("div");
    metricsDiv.className = "math-metrics";
    metricsDiv.innerHTML = `
      <div class="metric-tags">
        <span class="metric-tag">🎯 دقة: ${resultObj.confidence}%</span>
        <span class="metric-tag">📊 جمل محللة: ${resultObj.analyzedCount}</span>
        <span class="metric-tag">⚡ ${resultObj.timeMs} ms</span>
      </div>
    `;

    const copyBtn = document.createElement("button");
    copyBtn.className = "copy-btn";
    copyBtn.textContent = t.copy;
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(resultObj.answer);
      copyBtn.textContent = t.copied;
      setTimeout(() => copyBtn.textContent = t.copy, 2000);
    };

    metricsDiv.appendChild(copyBtn);
    msgDiv.appendChild(metricsDiv);
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  async function handleUserSubmit() {
    const query = userInput.value.trim();
    if (!query) return;

    const lang = langSelect ? langSelect.value : "ar";
    const t = translations[lang];

    triggerLogoBoost(2000);
    appendUserMessage(query);
    userInput.value = "";

    if (statusBar) statusBar.classList.add("computing");
    if (statusText) statusText.textContent = t.statusComputing;

    try {
      const result = await executeVotaEngine(query, lang);
      appendAiResponse(result, lang);
    } catch (error) {
      appendAiResponse({
        answer: "حدث خطأ أثناء الاتصال بقواعد البيانات المفتوحة. تأكد من اتصالك بالإنترنت.",
        confidence: 0,
        analyzedCount: 0,
        timeMs: "0.0"
      }, lang);
    } finally {
      if (statusBar) statusBar.classList.remove("computing");
      if (statusText) statusText.textContent = t.statusReady;
    }
  }

  if (sendBtn) {
    sendBtn.addEventListener("click", handleUserSubmit);
  }
  if (userInput) {
    userInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleUserSubmit();
    });
  }
});
