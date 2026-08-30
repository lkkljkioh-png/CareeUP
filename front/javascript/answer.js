console.log("answer.js 실행됨");

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

    checkPermission();
    loadQuestion();
});


// ==========================
// 답변 권한 확인
// ==========================
function checkPermission() {

    const token = localStorage.getItem("token");
    const membershipType = localStorage.getItem("membershipType");

    if (!token) {
        alert("로그인이 필요합니다.");
        location.href = "login.html";
        return;
    }

    if (membershipType !== "graduate") {
        alert("졸업생만 답변을 작성할 수 있습니다.");
        location.href = `questionDetail.html?id=${questionId}`;
    }
}


// ==========================
// 질문 정보 조회
// ==========================
async function loadQuestion() {

    try {

        const url = `${QUESTION_API}/${questionId}`;

        console.log("질문 조회 URL:", url);

        const response = await fetch(url);

        console.log("질문 조회 status:", response.status);

        const text = await response.text();

        console.log("서버 원본 응답:", text);

        if (!response.ok) {
            alert("질문 조회 실패: " + response.status);
            return;
        }

        const result = JSON.parse(text);

        console.log("질문 조회 결과:", result);

        if (!result.success) {

            alert(
                result.message ||
                "질문 정보를 불러오지 못했습니다."
            );

            return;
        }

        renderQuestion(result.data);

    } catch (error) {

        console.error("질문 조회 실제 오류:", error);

        alert("서버에 연결할 수 없습니다.");
    }
}


// ==========================
// 질문 출력
// ==========================
function renderQuestion(question) {

    document.getElementById("question-title").textContent =
        question.title;

    document.getElementById("question-writer").textContent =
        question.writerName;

    document.getElementById("question-content").textContent =
        question.content;

    document.getElementById("question-date").textContent =
        formatDate(question.createdAt);
}


// ==========================
// 답변 등록
// ==========================
async function submitAnswer() {

    const token = localStorage.getItem("token");

    const content =
        document.getElementById("answer-content").value.trim();

    if (!token) {
        alert("로그인이 필요합니다.");
        location.href = "login.html";
        return;
    }

    if (!content) {
        alert("답변 내용을 입력해주세요.");
        return;
    }

    try {

        const response = await fetch(
            `${QUESTION_API}/${questionId}/answers`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },

                body: JSON.stringify({
                    content: content
                })
            }
        );

        const result = await response.json();

        console.log("답변 등록 결과:", result);

        if (!response.ok || !result.success) {

            alert(
                result.message ||
                "답변 등록에 실패했습니다."
            );

            return;
        }

        alert("답변이 등록되었습니다.");

        location.href =
            `questionDetail.html?id=${questionId}`;

    } catch (error) {

        console.error("답변 등록 오류:", error);

        alert("서버에 연결할 수 없습니다.");
    }
}


// ==========================
// 날짜
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