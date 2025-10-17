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
  let topHero;

  //--------
  // トップページ
  // ヒーロースライダー
  //--------
  if (document.querySelector(".js-top-hero")) {
    topHero = new Swiper(".js-top-hero", {
      loop: true,
      allowTouchMove: false,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },

      pagination: {
        el: ".js-top-hero-pagination",
        clickable: true,
      },
    });

    // 初期状態では自動再生を止めておく
    topHero.autoplay.stop();

    // 再生/停止ボタン
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

  // ローディング完了後にスライダー開始
  if (document.querySelector(".js-loading")) {
    loading().then(() => {
      if (topHero) {
        topHero.slideToLoop(0, 0); // 最初のスライドから
        topHero.autoplay.start();
      }
      gsap
        .timeline()
        .to(".js-top-logo", { opacity: 1, duration: 0.6 })
        .to(".js-top-text", { opacity: 1, duration: 0.6 });
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

  fadeIn();
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
// ローディングアニメーション
//--------
function loading() {
  return new Promise(async (resolve) => {
    await document.fonts.ready;

    let split = SplitText.create(".js-loading-text", { type: "words, chars" });

    gsap
      .timeline({
        onComplete: () => {
          document.querySelector(".js-loading").remove();
          resolve();
        },
      })
      .from(split.chars, {
        duration: 0.6,
        y: -20,
        autoAlpha: 0,
        stagger: 0.05,
      })
      .from(
        ".js-loading-image img",
        {
          y: "-20",
          autoAlpha: 0,
          stagger: 0.6,
          duration: 0.6,
          ease: "power2.out",
        },
        ">0.2"
      )
      .to(
        ".js-loading",
        {
          autoAlpha: 0,
          duration: 0.4,
          onStart: () => {
            window.scrollTo({ top: 0 });
          },
        },
        ">0.6"
      );
  });
}

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

//--------
// gsap フェードインアニメーション
//--------
function fadeIn() {
  if (document.querySelector(".js-fade-in")) {
    //下からフェードイン
    gsap.utils.toArray(".js-fade-in").forEach((el) => {
      gsap.from(el, {
        y: 50,
        autoAlpha: 0,
        duration: 0.6,
        ease: Power2.out,
        scrollTrigger: {
          start: "top 80%",
          trigger: el,
        },
      });
    });
  }

  if (document.querySelector(".js-fade-in-left")) {
    //左から順に下からフェードイン
    gsap.set(".js-fade-in-left", {
      y: 50,
      autoAlpha: 0,
    });

    ScrollTrigger.batch(".js-fade-in-left", {
      batchMax: 3,
      onEnter: (batch) =>
        gsap.to(batch, {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          ease: Power2.out,
          stagger: {
            each: 0.3,
            from: "start",
          },
        }),
      start: "top 80%",
    });
  }
}
