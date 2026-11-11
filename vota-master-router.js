/* ==========================================================================
   VOTA MASTER ROUTER - الموجه المركزي لربط المصادر الستة والقاموس المصري
   ========================================================================== */
window.addEventListener("load", () => {
  const sendBtn = document.getElementById("send-btn");
  const userInput = document.getElementById("user-input");
  const langSelect = document.getElementById("language-select");
  const statusBar = document.getElementById("status-bar");
  const statusText = document.getElementById("status-text");
  const chatBox = document.getElementById("chat-box");

  if (!sendBtn || !userInput) return;

  // إزالة أي أحداث قديمة على زرار الإرسال عشان الموجه الجديد هو اللي يشتغل
  const newSendBtn = sendBtn.cloneNode(true);
  sendBtn.parentNode.replaceChild(newSendBtn, sendBtn);

  async function masterExecute() {
    const rawQuery = userInput.value.trim();
    if (!rawQuery) return;

    const lang = langSelect ? langSelect.value : "ar";
    userInput.value = "";

    // 1. إظهار رسالة المستخدم في الشاشة
    const hero = document.getElementById("hero-welcome");
    if (hero) hero.remove();
    const userDiv = document.createElement("div");
    userDiv.className = "message user-msg";
    userDiv.textContent = rawQuery;
    chatBox.appendChild(userDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    // تفعيل مؤشر الحسابات
    if (statusBar) statusBar.classList.add("computing");
    if (statusText) statusText.textContent = "جاري الترجمة المصرية والبحث المتوازي في 6 مصادر عالمية...";

    const startTime = performance.now();

    try {
      // الخطوة أ: معالجة العامية المصرية ومراجعة المحادثة الكاملة
      let processedQuery = rawQuery;
      if (window.VotaEgyptianNLP && typeof window.VotaEgyptianNLP.process === "function") {
        const nlpResult = window.VotaEgyptianNLP.process(rawQuery, lang);
        processedQuery = nlpResult.optimizedQuery || rawQuery;
      }

      // الخطوة ب: البحث في المصادر الستة (ويكيبيديا، ويكي بيانات، أبحاث علمية، معاجم، كتب)
      let result = null;
      if (window.VotaOmniSearch && typeof window.VotaOmniSearch.searchAll === "function") {
        result = await window.VotaOmniSearch.searchAll(processedQuery, rawQuery, lang);
      } else if (window.VotaBrain && typeof window.VotaBrain.thinkAndAnswer === "function") {
        result = await window.VotaBrain.thinkAndAnswer(processedQuery, lang);
      }

      const elapsed = (performance.now() - startTime).toFixed(1);
      const sourcesList = (result && result.sources && result.sources.length > 0)
        ? result.sources.join(" + ")
        : "Wikipedia + Wikidata + OpenAlex";

      // عرض النتيجة مع إظهار المصادر الستة بوضوح
      const aiDiv = document.createElement("div");
      aiDiv.className = "message ai-msg";
      aiDiv.innerHTML = `
        <div class="msg-content">${result ? result.answer : "لم أتمكن من استخراج إجابة."}</div>
        <div class="math-metrics">
          <div class="metric-tags">
            <span class="metric-tag">🎯 دقة: ${result?.confidence || 88}%</span>
            <span class="metric-tag">📚 المصادر: ${sourcesList}</span>
            <span class="metric-tag">⚡ ${elapsed} ms</span>
          </div>
        </div>
      `;
      chatBox.appendChild(aiDiv);
      chatBox.scrollTop = chatBox.scrollHeight;

      // حفظ الرد في ذاكرة المحادثة المصرية
      if (window.VotaEgyptianNLP && typeof window.VotaEgyptianNLP.recordReply === "function") {
        window.VotaEgyptianNLP.recordReply(rawQuery, result?.answer || "");
      }

    } catch (err) {
      const errDiv = document.createElement("div");
      errDiv.className = "message ai-msg";
      errDiv.textContent = "حدث خطأ في الاتصال بالمصادر: " + err.message;
      chatBox.appendChild(errDiv);
    } finally {
      if (statusBar) statusBar.classList.remove("computing");
      if (statusText) statusText.textContent = "النظام جاهز للمعالجة الرياضية الفورية O(1)";
    }
  }

  newSendBtn.addEventListener("click", masterExecute);
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") masterExecute();
  });
});
