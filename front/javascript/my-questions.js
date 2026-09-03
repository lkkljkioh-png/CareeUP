console.log("my-questions.js 실행됨");

const MY_QUESTION_API = "http://localhost:8080/api/questions/my";

window.addEventListener("DOMContentLoaded", () => {
    loadMyQuestions();
});

async function loadMyQuestions() {

    const token = localStorage.getItem("token");

    if (!token) {
        alert("로그인이 필요합니다.");
        location.href = "login.html";
        return;
    }

    try {

        const response = await fetch(MY_QUESTION_API, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const result = await response.json();

        console.log("내 질문 조회 결과:", result);

        if (!response.ok || !result.success) {
            alert(result.message || "내 질문을 불러오지 못했습니다.");
            return;
        }

        updateSummary(result.data);
        renderMyQuestions(result.data);

    } catch (error) {

        console.error("내 질문 조회 오류:", error);

        alert("서버에 연결할 수 없습니다.");
    }
}

function updateSummary(questions) {

    const total = questions.length;

    const done = questions.filter(
        question => question.status === "ANSWERED"
    ).length;

    const waiting = questions.filter(
        question => question.status === "WAITING"
    ).length;

    document.getElementById("my-question-count").textContent =
        total;

    document.getElementById("my-question-done").textContent =
        done;

    document.getElementById("my-question-waiting").textContent =
        waiting;
}

function renderMyQuestions(questions) {

    const questionList =
        document.getElementById("my-question-list");

    questionList.innerHTML = "";

    if (!questions || questions.length === 0) {

        questionList.innerHTML = `
            <div class="empty-question">
                작성한 질문이 없습니다.
            </div>
        `;

        return;
    }

    questions.forEach(question => {

        const card = document.createElement("div");

        card.className = "question-card";

        if (question.status === "ANSWERED") {
            card.classList.add("answered");
        }

        card.innerHTML = `
            <div class="q-top">

                <span class="category">
                    ${getCategoryName(question.category)}
                </span>

                <span class="status ${question.status.toLowerCase()}">
                    ${
                        question.status === "ANSWERED"
                            ? "답변 완료"
                            : "답변 대기"
                    }
                </span>

                <span class="date">
                    ${formatDate(question.createdAt)}
                </span>

            </div>

            <h3>
                ${escapeHtml(question.title)}
            </h3>

            <p>
                ${escapeHtml(question.content)}
            </p>
        `;

        card.addEventListener("click", () => {

            location.href =
                `questionDetail.html?id=${question.id}`;
        });

        questionList.appendChild(card);
    });
}

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