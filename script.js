
// ========================================
// スマートフォン用メニュー
// ========================================

const menuToggle =
    document.querySelector(".menu-toggle");

const siteNav =
    document.querySelector(".site-nav");

if (menuToggle && siteNav) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            siteNav.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "メニューを閉じる"
                : "メニューを開く"
        );

        menuToggle.textContent =
            isOpen ? "×" : "☰";

    });

    // メニュー選択後に閉じる
    siteNav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            siteNav.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "メニューを開く"
            );

            menuToggle.textContent = "☰";

        });

    });

    // PC表示に戻ったときに状態をリセット
    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {

            siteNav.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.textContent = "☰";

        }

    });

}


// ========================================
// フッターの西暦を自動更新
// ========================================

const currentYear =
    document.getElementById("current-year");

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}
