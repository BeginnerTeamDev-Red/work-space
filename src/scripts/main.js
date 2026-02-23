document.addEventListener("DOMContentLoaded", () => {
  const isResultPage = location.pathname.endsWith("omikuji.html");
  if (!isResultPage) return;

  const UnseiImage = document.getElementById("UnseiImage"); 
  const UnseiMessage = document.getElementById("UnseiMessage");

  const luckyColor = document.getElementById("luckyColor");
  const luckyNumber = document.getElementById("luckyNumber");
  const luckyLang = document.getElementById("luckyLang");

  const againBtn = document.getElementById("againBtn");
  const backBtn = document.getElementById("backBtn");

  if (!UnseiMessage || !luckyColor || !luckyNumber || !luckyLang || !againBtn || !backBtn) return;

  const Unsei = [
    {
      name: "大吉",
      img: "./assets/omikuji_daikichi.png",
      messages: [
        "運気上昇中。今後の仕込みのために新しい技術もウォッチしましょう。",
        "絶好調。努力を怠らず、関わる人への感謝を忘れずに。"
      ]
    },
    {
      name: "吉",
      img: "./assets/omikuji_kichi.png",
      messages: [
        "運気上向きです。新しい技術やプロジェクトにチャレンジしてみましょう。",
        "好調が続きます。次のステップに備えて準備しましょう。"
      ]
    },
    {
      name: "中吉",
      img: "./assets/omikuji_chuukichi.png",
      messages: [
        "これから運気があがります。来る日に備えて勉強を継続しましょう。",
        "さらに運気をあげていきましょう。日々の学習を忘れずに。"
      ]
    },
    {
      name: "小吉",
      img: "./assets/omikuji_syoukichi.png",
      messages: [
        "平和な日々が続きます。やりたかったツールの導入をしてみては？",
        "プロジェクトが順調に進みます。リスクの再検討しておきましょう。"
      ]
    },
    {
      name: "末吉",
      img: "./assets/omikuji_suekichi.png",
      messages: [
        "明るい未来に期待。生産性や品質の向上を目指しましょう。",
        "今後の期待を込めて、チーム全体での生産性向上につとめましょう。"
      ]
    },
    {
      name: "凶",
      img: "./assets/omikuji_kyou.png",
      messages: [
        "運気はよくありません。リスク管理に注力しましょう。\nエラー処理には気を付けて",
        "運気は良くないです。生成AIに頼り過ぎないように。"
      ]
    },
    {
      name: "大凶",
      img: "./assets/omikuji_daikyou.png",
      messages: [
        "つらい時でも、明けない夜はありません。\nこういう時こそ関係者にヘルプをお願いしましょう。",
        "運勢は最悪ですが、これ以上悪くなることはありません。\n地道に改善に向けて努力しましょう。"
      ]
    }
  ];

  const LUCKY_COLORS = ["赤色", "青色", "黄色", "緑色", "紫色", "金色", "銀色"];
  const LUCKY_NUMBERS = ["1", "2", "3", "5", "7", "8", "10"];
  const LUCKY_LANGS = ["Java", "JavaScript", "Python", "PHP", "Go", "Swift", "Perl"];

  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  function showOmikuji() {
    const f = pick(Unsei);
    const msg = pick(f.messages);

    // 画像表示
    if (UnseiImage) {
      UnseiImage.src = f.img;
      UnseiImage.alt = f.name;
      UnseiImage.style.display = "block";
    }

    // 改行を表示するのに innerTextを使う
    UnseiMessage.innerText = msg;

    luckyColor.textContent = pick(LUCKY_COLORS);
    luckyNumber.textContent = pick(LUCKY_NUMBERS);
    luckyLang.textContent = pick(LUCKY_LANGS);
  }

  // 初回　ページを開いたら1回実行
  showOmikuji();

  // もう一度：別結果に“遷移”させる（?rndで確実に遷移）
  againBtn.addEventListener("click", () => {
    location.href = "omikuji.html?rnd=" + Date.now();
  });

  // 戻る：フロントページへ（履歴関係なし）
  backBtn.addEventListener("click", () => {
    location.href = "index.html";
  });
});