document.addEventListener("DOMContentLoaded", () => {
  //--------
  // トップページ
  // ヒーロースライダー
  //--------
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

  //--------
  // ヘッダー
  // ハンバーガーメニュー開閉
  //--------
  document
    .querySelector(".js-menu-button")
    .addEventListener("click", function () {
      const menu = document.querySelector(".js-menu");
      if (this.classList.contains("is-open")) {
        htmlScroll();
        this.classList.remove("is-open");
        this.setAttribute("aria-label", "メニューを開く");
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
      } else {
        htmlFix();
        this.classList.add("is-open");
        this.setAttribute("aria-label", "メニューを閉じる");
        menu.style.display = "block";
        requestAnimationFrame(() => {
          menu.classList.add("is-open");
        });
      }
    });
});

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
