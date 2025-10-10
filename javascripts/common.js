//--------
// スクロール禁止
//--------
function htmlFix() {
  document.documentElement.classList.add("is-fixed");
  window.scrollTo({
    top: 0,
    behavior: "instant",
  });
}
//--------
// スクロール禁止解除
//--------
function htmlScroll() {
  document.documentElement.classList.remove("is-fixed");
}

//　**＊＊ 読み込み時　*＊＊＊
document.addEventListener("DOMContentLoaded", () => {
  //--------
  // トップページ
  // ヒーロースライダー
  //--------
  if (document.querySelector(".js-top-hero")) {
    const topHero = new Swiper(".js-top-hero", {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },

      pagination: {
        el: ".js-top-hero-pagination",
        clickable: true,
      },
    });

    //--------
    // トップページ
    // ヒーロースライダー 再生/停止ボタン
    //--------
    document
      .querySelector(".js-top-hero-control")
      .addEventListener("click", function () {
        if (this.classList.contains("is-pause")) {
          this.classList.remove("is-pause");
          this.textContent = "停止する";
          topHero.autoplay.start();
        } else {
          this.classList.add("is-pause");
          this.textContent = "再生する";

          topHero.autoplay.stop();
        }
      });
  }

  //--------
  // ヘッダー
  // ハンバーガーメニュー開閉
  //--------
  document
    .querySelector(".js-menu-button")
    .addEventListener("click", function () {
      const button = this;
      const menu = document.querySelector(".js-menu");
      if (this.classList.contains("is-open")) {
        menuClose(button, menu);
      } else {
        menuOpen(button, menu);
      }
    });
});

// ＊＊＊＊ リサイズ時 ＊＊＊＊
window.addEventListener("resize", () => {
  const button = document.querySelector(".js-menu-button");
  const menu = document.querySelector(".js-menu");
  if (window.innerWidth >= 768 && button.classList.contains("is-open")) {
    menu.style.display = "";
    menuClose(button, menu);
    menu.style.transform = "";
  }
});

//--------
// ヘッダー
// ハンバーガーメニュー open
//--------
function menuOpen(button, menu) {
  htmlFix();
  button.classList.add("is-open");
  button.setAttribute("aria-label", "メニューを閉じる");
  menu.style.display = "block";
  requestAnimationFrame(() => {
    menu.classList.add("is-open");
  });
}

//--------
// ヘッダー
// ハンバーガーメニュー close
//--------
function menuClose(button, menu) {
  htmlScroll();
  button.classList.remove("is-open");
  button.setAttribute("aria-label", "メニューを開く");
  menu.style.transform = "translateX(100%)";
  menu.addEventListener(
    "transitionend",
    () => {
      menu.classList.remove("is-open");
      menu.style.display = "none";
      menu.style.transform = "";
    },
    { once: true }
  );
}
