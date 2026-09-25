// 햄버거 메뉴
const menuToggle = document.querySelector("#menu-toggle");
const navMenu = document.querySelector("nav ul");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

const navLinks = document.querySelectorAll("nav ul a");

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });
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

nameInput.addEventListener("input", () => {
    nameError.textContent = "";
});

emailInput.addEventListener("input", () => {
    emailError.textContent = "";
});

messageInput.addEventListener("input", () => {
    messageError.textContent = "";
});

// GitHub 프로젝트
// GitHub 프로젝트
const projectList = document.querySelector("#project-list");
const projectFilter = document.querySelector("#project-filter");

// 프로젝트 상태
let projectState = {
    status: "loading",
    projects: [],
    error: null,
    language: "all"
};

// 실제 GitHub 프로젝트에 존재하는 언어로 필터 버튼 생성
const renderFilters = (projects) => {
    const languages = [
        ...new Set(
            projects
                .map((project) => project.language)
                .filter((language) => language)
        )
    ];

    projectFilter.innerHTML = `
        <button type="button" data-language="all" class="active">
            전체
        </button>

        ${languages
            .map((language) => {
                return `
                    <button type="button" data-language="${language}">
                        ${language}
                    </button>
                `;
            })
            .join("")}
    `;
};

// 프로젝트 화면 출력
const renderProjects = () => {
    const { status, projects, error, language } = projectState;

    // 로딩
    if (status === "loading") {
        projectList.innerHTML = "<p>프로젝트를 불러오는 중...</p>";
        return;
    }

    // 오류
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

    // 프로젝트가 없는 경우
    if (status === "success" && projects.length === 0) {
        projectList.innerHTML = "<p>표시할 프로젝트가 없습니다.</p>";
        return;
    }

    // 선택된 언어에 따라 프로젝트 필터링
    const filteredProjects =
        language === "all"
            ? projects
            : projects.filter((project) => {
                  return project.language === language;
              });

    // 필터 결과가 없는 경우
    if (filteredProjects.length === 0) {
        projectList.innerHTML =
            "<p>해당 언어의 프로젝트가 없습니다.</p>";
        return;
    }

    // 프로젝트 카드 생성
    projectList.innerHTML = filteredProjects
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

// 동적으로 생성된 필터 버튼 클릭 처리
projectFilter.addEventListener("click", (event) => {
    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    const { language } = button.dataset;

    projectState.language = language;

    const filterButtons =
        projectFilter.querySelectorAll("button");

    filterButtons.forEach((item) => {
        item.classList.remove("active");
    });

    button.classList.add("active");

    renderProjects();
});

// GitHub 저장소 불러오기
const fetchProjects = async () => {
    projectState = {
        status: "loading",
        projects: [],
        error: null,
        language: projectState.language
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
            error: null,
            language: "all"
        };

        // API 데이터를 받은 후 필터 버튼 생성
        renderFilters(data);

        // 프로젝트 카드 생성
        renderProjects();
    } catch (error) {
        projectState = {
            status: "error",
            projects: [],
            error: error.message,
            language: "all"
        };

        renderProjects();
    }
};

fetchProjects();