console.log("qa.js 실행됨");

const QUESTION_API = "http://localhost:8080/api/questions";

window.addEventListener("DOMContentLoaded", () => {

    loadQuestions();

    const categoryFilter =
        document.getElementById("category-filter");

    const searchButton =
        document.getElementById("search-btn");

    const searchInput =
        document.getElementById("question-search");


    // 카테고리 변경
    categoryFilter?.addEventListener("change", () => {
        loadQuestions();
    });


    // 검색 버튼
    searchButton?.addEventListener("click", () => {
        loadQuestions();
    });


    // Enter 검색
    searchInput?.addEventListener("keydown", event => {

        if (event.key === "Enter") {
            loadQuestions();
        }
    });
});


// ==========================
// 질문 목록 조회
// ==========================
async function loadQuestions() {

    try {

        const category =
            document.getElementById("category-filter")?.value || "";

        const keyword =
            document.getElementById("question-search")?.value.trim() || "";

        const params = new URLSearchParams();

        if (category) {
            params.append("category", category);
        }

        if (keyword) {
            params.append("keyword", keyword);
        }

        let url = QUESTION_API;

        if (params.toString()) {
            url += "?" + params.toString();
        }

        console.log("질문 조회 URL:", url);

        const response = await fetch(url);

        const result = await response.json();

        console.log("질문 목록:", result);

        if (!response.ok || !result.success) {
            alert(result.message || "질문 목록을 불러오지 못했습니다.");
            return;
        }

        renderQuestions(result.data);

    } catch (error) {

        console.error("질문 목록 조회 오류:", error);
    }
}


// ==========================
// 질문 출력
// ==========================
function renderQuestions(questions) {

    const questionList =
        document.getElementById("question-list");

    questionList.innerHTML = "";

    if (!questions || questions.length === 0) {

        questionList.innerHTML = `
            <div class="empty-question">
                등록된 질문이 없습니다.
            </div>
        `;

        return;
    }


    questions.forEach(question => {

        const item = document.createElement("div");

        // 기존 CSS와 맞춤
        item.className = "question-card";


        // 답변 완료 질문
        if (question.status === "ANSWERED") {
            item.classList.add("answered");
        }


        item.innerHTML = `

            <div class="question-top">

                <span class="question-category">
                    ${getCategoryName(question.category)}
                </span>

                <span class="question-status ${question.status.toLowerCase()}">
                    ${getStatusName(question.status)}
                </span>

            </div>


            <h3 class="question-title">
                ${escapeHtml(question.title)}
            </h3>


            <div class="question-info">

                <span class="writer">
                    ${escapeHtml(question.writerName)}
                </span>

                <span class="divider">|</span>

                <span class="date">
                    ${formatDate(question.createdAt)}
                </span>

                <span class="divider">|</span>

                <span>
                    조회 ${question.viewCount}
                </span>

            </div>
        `;


        item.addEventListener("click", () => {

            location.href =
                `questionDetail.html?id=${question.id}`;
        });


        questionList.appendChild(item);
    });
}


// ==========================
// 카테고리
// ==========================
function getCategoryName(category) {

    const categories = {
        CAREER: "진로/취업",
        MAJOR: "전공 선택",
        STUDY: "학업/공부법",
        CERTIFICATE: "자격증",
        ACTIVITY: "인턴/대외활동",
        INTERVIEW: "면접/자소서",
        JOB_INFO: "직무 정보",
        CAMPUS: "대학 생활",
        ETC: "기타"
    };

    return categories[category] || category;
}


// ==========================
// 답변 상태
// ==========================
function getStatusName(status) {

    if (status === "ANSWERED") {
        return "답변 완료";
    }

    return "답변 대기";
}


// ==========================
// 날짜
// ==========================
function formatDate(dateString) {

    if (!dateString) {
        return "";
    }

    const date = new Date(dateString);

    return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });
}


// ==========================
// HTML 안전 처리
// ==========================
function escapeHtml(value) {

    if (value == null) {
        return "";
    }

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}