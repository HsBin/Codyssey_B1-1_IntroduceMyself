// 햄버거 메뉴
const menuToggle = document.querySelector("#menu-toggle");
const navMenu = document.querySelector("nav ul");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

// 다크 모드
const themeToggle = document.querySelector("#theme-toggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");

    if (currentTheme === "dark") {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙";
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "☀️";
    }
});

// 스크롤 이벤트
const header = document.querySelector("header");
const scrollTopButton = document.querySelector("#scroll-top");

window.addEventListener("scroll", () => {
    // 60px 이상 스크롤하면 Header 스타일 변경
    if (window.scrollY >= 60) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

    // 300px 이상 스크롤하면 맨 위 버튼 표시
    if (window.scrollY >= 300) {
        scrollTopButton.classList.add("show");
    } else {
        scrollTopButton.classList.remove("show");
    }
});

scrollTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// 스크롤 애니메이션
const sections = document.querySelectorAll("section");

sections.forEach((section) => {
    section.classList.add("reveal");
});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    },
    {
        threshold: 0.2
    }
);

sections.forEach((section) => {
    observer.observe(section);
});