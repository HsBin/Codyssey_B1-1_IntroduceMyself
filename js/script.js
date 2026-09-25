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

// 문의 폼 유효성 검사
const contactForm = document.querySelector("#contact-form");

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");

const nameError = document.querySelector("#name-error");
const emailError = document.querySelector("#email-error");
const messageError = document.querySelector("#message-error");
const formSuccess = document.querySelector("#form-success");

const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let isValid = true;

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    formSuccess.textContent = "";

    if (nameInput.value.trim() === "") {
        nameError.textContent = "이름을 입력해주세요.";
        isValid = false;
    }

    if (emailInput.value.trim() === "") {
        emailError.textContent = "이메일을 입력해주세요.";
        isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
        emailError.textContent = "올바른 이메일 형식을 입력해주세요.";
        isValid = false;
    }

    if (messageInput.value.trim() === "") {
        messageError.textContent = "메시지를 입력해주세요.";
        isValid = false;
    }

    if (isValid) {
        formSuccess.textContent = "문의가 정상적으로 작성되었습니다.";
        contactForm.reset();
    }
});

// GitHub 프로젝트
const projectList = document.querySelector("#project-list");

let projectState = {
    status: "loading",
    projects: [],
    error: null
};

const renderProjects = () => {
    const { status, projects, error } = projectState;

    if (status === "loading") {
        projectList.innerHTML = "<p>프로젝트를 불러오는 중...</p>";
        return;
    }

    if (status === "error") {
        projectList.innerHTML = `
            <div>
                <p>${error}</p>
                <button type="button" id="retry-button">다시 시도</button>
            </div>
        `;

        const retryButton = document.querySelector("#retry-button");

        retryButton.addEventListener("click", () => {
            fetchProjects();
        });

        return;
    }

    if (status === "success" && projects.length === 0) {
        projectList.innerHTML = "<p>표시할 프로젝트가 없습니다.</p>";
        return;
    }

    projectList.innerHTML = projects
    .map((project) => {
        return `
            <article class="project-card">
                <h3>${project.name}</h3>

                <p>
                    ${project.description || "프로젝트 설명이 없습니다."}
                </p>

                <p>
                    사용 언어: ${project.language || "정보 없음"}
                </p>

                <a
                    href="${project.html_url}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub에서 보기
                </a>
            </article>
        `;
    })
    .join("");
};

// GitHub 저장소 불러오기
const fetchProjects = async () => {
    projectState = {
        status: "loading",
        projects: [],
        error: null
    };

    renderProjects();

    try {
        const response = await fetch(
            "https://api.github.com/users/HsBin/repos"
        );

    if (response.status === 403) {
        throw new Error(
            "GitHub API 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요."
        );
    }

    if (!response.ok) {
        throw new Error(
            `GitHub 프로젝트를 불러오지 못했습니다. (${response.status})`
        );
    }

        const data = await response.json();

        projectState = {
            status: "success",
            projects: data,
            error: null
        };

        renderProjects();
    } catch (error) {
        projectState = {
            status: "error",
            projects: [],
            error: error.message
        };

        renderProjects();
    }
};

fetchProjects();