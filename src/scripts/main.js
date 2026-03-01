const config = {
  initPage: document.getElementById("init-display"),
  resultPage: document.getElementById("result-display"),
};

const unsei = [
  {
    name: "大吉",
    img: "omikuji_daikichi.png",
    messages: [
      "運気上昇中。今後の仕込みのために新しい技術もウォッチしましょう。",
      "絶好調。努力を怠らず、関わる人への感謝を忘れずに。",
    ],
  },
  {
    name: "吉",
    img: "omikuji_kichi.png",
    messages: [
      "運気上向きです。新しい技術やプロジェクトにチャレンジしてみましょう。",
      "好調が続きます。次のステップに備えて準備しましょう。",
    ],
  },
  {
    name: "中吉",
    img: "omikuji_chuukichi.png",
    messages: [
      "これから運気があがります。来る日に備えて勉強を継続しましょう。",
      "さらに運気をあげていきましょう。日々の学習を忘れずに。",
    ],
  },
  {
    name: "小吉",
    img: "omikuji_syoukichi.png",
    messages: [
      "平和な日々が続きます。やりたかったツールの導入をしてみては？",
      "プロジェクトが順調に進みます。リスクの再検討しておきましょう。",
    ],
  },
  {
    name: "末吉",
    img: "omikuji_suekichi.png",
    messages: [
      "明るい未来に期待。生産性や品質の向上を目指しましょう。",
      "今後の期待を込めて、チーム全体での生産性向上につとめましょう。",
    ],
  },
  {
    name: "凶",
    img: "omikuji_kyou.png",
    messages: [
      "運気はよくありません。リスク管理に注力しましょう。\nエラー処理には気を付けて",
      "運気は良くないです。生成AIに頼り過ぎないように。",
    ],
  },
  {
    name: "大凶",
    img: "omikuji_daikyou.png",
    messages: [
      "つらい時でも、明けない夜はありません。\nこういう時こそ関係者にヘルプをお願いしましょう。",
      "運勢は最悪ですが、これ以上悪くなることはありません。\n地道に改善に向けて努力しましょう。",
    ],
  },
];

const LUCKY_COLORS = ["赤色", "青色", "黄色", "緑色", "紫色", "金色", "銀色"];
const LUCKY_NUMBERS = ["1", "2", "3", "5", "7", "8", "10"];
const LUCKY_LANGS = [
  "Java",
  "JavaScript",
  "Python",
  "PHP",
  "Go",
  "Swift",
  "Perl",
];

const displayBlock = (el) => {
  el.classList.remove("d-none");
};

const displayNone = (el) => {
  el.classList.add("d-none");
};

const pick = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const selectContent = () => {
  const omikuji = pick(unsei);
  const msg = pick(omikuji.messages);
  const luckyColor = pick(LUCKY_COLORS);
  const luckyNumber = pick(LUCKY_NUMBERS);
  const luckyLang = pick(LUCKY_LANGS);

  return { omikuji, msg, luckyColor, luckyNumber, luckyLang };
};

const drawOmikuji = () => {
  return selectContent();
};

const createOmikuji = (result) => {
  const { omikuji, msg, luckyColor, luckyNumber, luckyLang } = result;

  const renderMsg = (msg) => msg.replace(/\n/g, "<br>");

  const el = document.createElement("div");

  el.classList.add("text-red", "border-red", "text-center", "bg-white");
  el.id = "omikuji-result";
  el.innerHTML = `
    <h1 class="pageTitle">ソフトウェア開発みくじ</h1>
    <!-- 運勢 -->
    <div>
        <img
        src="src/assets/${omikuji.img}"
        width="200"
        height="300"
        alt="${omikuji.name}"
        decoding="async"
        />
    </div>
    <!-- メッセージ -->
    <div class="text-center">
        <p class="d-inline-block text-start px-3 mb-0">
        ${renderMsg(msg)}
        </p>
    </div>
    <!-- ラッキーアイテム -->
    <div>
        <p>ラッキーカラー</p>
        <p class="mb-0">${luckyColor}</p>
    </div>
    <div>
        <p>ラッキーナンバー</p>
        <p class="mb-0">${luckyNumber}</p>
    </div>
    <div>
        <p>ラッキー言語</p>
        <p class="mb-0">${luckyLang}</p>
    </div>
    <!-- 次のおみくじと最初の画面に戻るボタン -->
    <div>
        <button id="retry-btn" class="btn btn-danger" type="button">もう一度</button>
    </div>
  `;

  el.querySelector("#retry-btn").addEventListener("click", showInit);

  return el;
};

const showResult = (result) => {
  displayNone(config.initPage);
  displayBlock(config.resultPage);
  config.resultPage.replaceChildren(createOmikuji(result));

  const name = result?.omikuji?.name;

  if (name === "大吉") {
    kamiFubuki();
  }

  if (name === "凶" || name === "大凶") {
    thunderLightening();
  }
};

const animEl = document.querySelector(".omikuji-anim");
const stickEl = document.querySelector(".omikuji-stick");
const drawBtn = document.getElementById("draw-btn");

let isAnimating = false;

const waitAnimationEnd = (el, expectedName) => {
  return new Promise((resolve) => {
    const onEnd = (event) => {
      if (event.target !== el) {
        return;
      }
      if (expectedName && event.animationName !== expectedName) {
        return;
      }
      el.removeEventListener("animationend", onEnd);
      el.removeEventListener("animationcancel", onCancel);
      resolve();
    };

    const onCancel = () => {
      el.removeEventListener("animationend", onEnd);
      el.removeEventListener("animationcancel", onCancel);
      resolve();
    };

    el.addEventListener("animationend", onEnd);
    el.addEventListener("animationcancel", onCancel);
  });
};

const resetAnimationState = () => {
  if (!animEl) {
    return;
  }

  animEl.classList.remove("is-shaking", "is-stick-rising", "is-waiting-result");
  void animEl.offsetWidth;
};

const showInit = () => {
  displayNone(config.resultPage);
  displayBlock(config.initPage);
  config.resultPage.innerHTML = "";
  resetAnimationState();
  isAnimating = false;
  if (drawBtn) {
    drawBtn.disabled = false;
  }
};

const runDrawSequence = async () => {
  if (!animEl || !stickEl || !drawBtn || isAnimating) {
    return;
  }

  isAnimating = true;
  drawBtn.disabled = true;

  resetAnimationState();

  animEl.classList.add("is-shaking");
  await waitAnimationEnd(animEl, "boxShake");

  animEl.classList.remove("is-shaking");
  void animEl.offsetWidth;

  animEl.classList.add("is-stick-rising");
  await waitAnimationEnd(stickEl, "stickRise");

  const result = drawOmikuji();

  animEl.classList.add("is-waiting-result");
  await waitAnimationEnd(animEl, "resultDelay");

  showResult(result);
};

if (drawBtn) {
  drawBtn.addEventListener("click", runDrawSequence);
}

/*Special effect
 大吉: 紙吹雪 */
const kamiFubuki = (count = 60) => {
  const colors = ["#ff4d4d", "#ffd24d", "#4dd2ff", "#7dff4d", "#b84dff"];

  for (let i = 0; i < count; i++) {
    const parts = document.createElement("div");
    parts.className = "kami-fubuki"; 
    parts.style.left = Math.random() * 100 + "vw";
    parts.style.background = pick(colors);
    parts.style.animationDelay = Math.random() * 0.3 + "s";
    parts.style.transform = `rotate(${Math.random() * 360}deg)`;

    document.body.appendChild(parts);
    setTimeout(() => parts.remove(), 2500);
  }
};

/* 凶&大凶: 雷 */
const thunderLightening = () => {
  const flash = document.createElement("div");
  flash.className = "lightning-flash";
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 1200);
};
