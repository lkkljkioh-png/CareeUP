console.log("questionDetail.js 실행됨");

const QUESTION_API = "http://localhost:8080/api/questions";

let questionId = null;


// ==========================
// 페이지 로드
// ==========================
window.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);

    questionId = params.get("id");

    console.log("questionId:", questionId);

    if (!questionId) {
        alert("잘못된 접근입니다.");
        location.href = "qa.html";
        return;
    }

    loadQuestion();
    loadAnswers();

    checkAnswerButton();
});


// ==========================
// 질문 상세 조회
// ==========================
async function loadQuestion() {

    try {

        const response = await fetch(
            `${QUESTION_API}/${questionId}`
        );

        const result = await response.json();

        console.log("질문 상세:", result);

        if (!response.ok || !result.success) {

            alert(
                result.message ||
                "질문을 불러오지 못했습니다."
            );

            location.href = "qa.html";
            return;
        }

        renderQuestion(result.data);

    } catch (error) {

        console.error(
            "질문 상세 조회 오류:",
            error
        );
    }
}


// ==========================
// 질문 출력
// ==========================
function renderQuestion(question) {

    // 카테고리
    document.getElementById(
        "question-category"
    ).textContent =
        getCategoryName(question.category);


    // 제목
    document.getElementById(
        "question-title"
    ).textContent =
        question.title;


    // 작성자
    document.getElementById(
        "question-writer"
    ).innerHTML = `
        <i class="ti ti-user"></i>
        ${escapeHtml(question.writerName)}
    `;


    // 내용
    document.getElementById(
        "question-content"
    ).textContent =
        question.content;


    // 날짜
    document.getElementById(
        "question-date"
    ).innerHTML = `
        <i class="ti ti-calendar"></i>
        ${formatDate(question.createdAt)}
    `;
}


// ==========================
// 답변 목록 조회
// ==========================
async function loadAnswers() {

    try {

        const response = await fetch(
            `${QUESTION_API}/${questionId}/answers`
        );

        const result = await response.json();

        console.log("답변 목록:", result);

        if (!response.ok || !result.success) {

            console.error(
                result.message ||
                "답변 조회 실패"
            );

            return;
        }

        renderAnswers(result.data);

    } catch (error) {

        console.error(
            "답변 목록 조회 오류:",
            error
        );
    }
}


// ==========================
// 답변 출력
// ==========================
function renderAnswers(answers) {

    const answerList =
        document.getElementById("answer-list");

    answerList.innerHTML = "";


    if (!answers || answers.length === 0) {

        answerList.innerHTML = `
            <div class="no-answer">
                아직 등록된 답변이 없습니다.
            </div>
        `;

        return;
    }


    answers.forEach(answer => {

        const card =
            document.createElement("div");

        card.className = "answer-card";


        let careerInfo = "";

        if (answer.company || answer.position) {

            careerInfo = `
                <div class="answer-career">
                    ${escapeHtml(answer.company || "")}
                    ${
                        answer.company && answer.position
                            ? " · "
                            : ""
                    }
                    ${escapeHtml(answer.position || "")}
                </div>
            `;
        }


        card.innerHTML = `

            <div class="answer-info">

                <div>

                    <span class="answer-writer">
                        <i class="ti ti-user"></i>
                        ${escapeHtml(answer.writerName)}
                    </span>

                    ${careerInfo}

                </div>

                <span class="answer-date">
                    ${formatDate(answer.createdAt)}
                </span>

            </div>

            <p class="answer-content">
                ${escapeHtml(answer.content)}
            </p>
        `;

        answerList.appendChild(card);
    });
}


// ==========================
// 답변하기 버튼 권한
// ==========================
function checkAnswerButton() {

    const answerButton =
        document.getElementById("answer-btn");

    const token =
        localStorage.getItem("token");

    const membershipType =
        localStorage.getItem("membershipType");


    if (!answerButton) {
        return;
    }


    // 졸업생만 답변 가능
    if (!token || membershipType !== "graduate") {

        answerButton.style.display = "none";

    } else {

        answerButton.style.display = "inline-flex";
    }
}


// ==========================
// 답변 작성 페이지 이동
// ==========================
function goAnswer() {

    if (!questionId) {
        return;
    }

    location.href =
        `answer.html?id=${questionId}`;
}


// ==========================
// 카테고리 한글 변환
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
// 날짜 변환
// ==========================
function formatDate(dateString) {

    if (!dateString) {
        return "";
    }

    const date = new Date(dateString);

    return date.toLocaleDateString(
        "ko-KR",
        {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }
    );
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