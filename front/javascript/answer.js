document.addEventListener("DOMContentLoaded", () => {

    // 선택한 질문 가져오기
    const question = JSON.parse(localStorage.getItem("selectedQuestion"));

    if (!question) {
        alert("질문 정보를 찾을 수 없습니다.");
        location.href = "../html/qa.html";
        return;
    }

    // 질문 정보 출력
    document.getElementById("question-title").innerText = question.title;
    document.getElementById("question-writer").innerText = question.writer;
    document.getElementById("question-date").innerText = question.date;
    document.getElementById("question-content").innerText = question.content;

});

// 답변 등록
function submitAnswer() {

    const content = document.getElementById("answer-content").value.trim();

    if (content === "") {
        alert("답변을 입력해주세요.");
        return;
    }

    // 로그인한 사용자
    const loginUser = JSON.parse(localStorage.getItem("loginUser"));

    if (!loginUser) {
        alert("로그인 후 이용해주세요.");
        location.href = "../html/login.html";
        return;
    }

    // (선택) 졸업생만 답변 가능
    if (loginUser.membershipType !== "졸업생") {
        alert("졸업생만 답변을 작성할 수 있습니다.");
        return;
    }

    // 현재 질문
    const question = JSON.parse(localStorage.getItem("selectedQuestion"));

    // 답변 목록
    const answers = JSON.parse(localStorage.getItem("answers")) || [];

    // 답변 생성
    const answer = {

        id: Date.now(),

        questionId: question.id,

        writer: loginUser.name,

        date: new Date().toLocaleDateString("ko-KR"),

        content: content

    };

    answers.push(answer);

    localStorage.setItem("answers", JSON.stringify(answers));

    alert("답변이 등록되었습니다.");

    location.href = "../html/questionDetail.html";

}