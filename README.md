# 자기소개 포트폴리오 웹사이트

HTML, CSS, JavaScript를 활용하여 제작한 반응형 개인 포트폴리오 웹사이트입니다.

## 프로젝트 소개

사용자의 화면 크기에 따라 레이아웃이 변경되는 반응형 웹페이지입니다.

자기소개, 기술 스택, GitHub 프로젝트, 문의 폼 등의 내용을 확인할 수 있으며,
다크 모드, 모바일 메뉴, 스크롤 애니메이션 등의 인터랙션을 구현했습니다.

GitHub REST API를 활용하여 GitHub 저장소 정보를 불러오고,
프로그래밍 언어에 따라 프로젝트를 필터링할 수 있습니다.

## 사용 기술

- HTML5
- CSS3
  - Flexbox
  - Grid
  - Media Query
  - CSS Variables
- JavaScript (ES6+)
  - DOM 조작
  - Event Listener
  - Local Storage
  - Intersection Observer
  - Fetch API
  - Async/Await
- GitHub REST API


## 주요 기능

- 반응형 웹 디자인
  - 모바일 우선(Mobile First) 방식으로 구현
  - 768px, 1024px 브레이크포인트 적용

- 모바일 햄버거 메뉴
  - 모바일 환경에서 메뉴 열기/닫기
  - 메뉴 선택 시 자동 닫기

- 다크 모드
  - 라이트/다크 테마 전환
  - Local Storage를 이용하여 새로고침 후에도 선택한 테마 유지

- 스크롤 인터랙션
  - 60px 이상 스크롤 시 Header 스타일 변경
  - 300px 이상 스크롤 시 맨 위로 이동 버튼 표시
  - Intersection Observer의 threshold를 0.2로 설정하여 섹션 등장 애니메이션 구현

- GitHub 프로젝트
  - GitHub REST API를 이용하여 저장소 목록 불러오기
  - 로딩, 성공, 오류, 빈 결과 상태 처리
  - API 요청 실패 시 다시 시도 기능 제공
  - 프로그래밍 언어별 프로젝트 필터링

- 문의 폼
  - 이름, 이메일, 메시지 필수 입력 검사
  - 이메일 형식 검사
  - 입력 오류 메시지 표시
  - 정상 입력 시 확인 메시지 표시

  ## 프로젝트 구조

```text
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   └── profile.jpg
└── README.md
```

- `index.html`: 웹페이지의 전체 구조
- `css/style.css`: 반응형 레이아웃 및 디자인
- `js/script.js`: 사용자 인터랙션 및 GitHub API 처리
- `images/`: 프로필 이미지 등 이미지 파일 저장


## 실행 방법

1. 저장소를 Clone합니다.

```bash
git clone https://github.com/HsBin/Codyssey_B1-1_IntroduceMyself.git
```

2. 프로젝트 폴더로 이동합니다.

```bash
cd Codyssey_B1-1_IntroduceMyself
```

3. `index.html` 파일을 웹 브라우저에서 실행합니다.

별도의 프레임워크나 패키지 설치 없이 실행할 수 있습니다.

