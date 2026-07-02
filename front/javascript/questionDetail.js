// 더미 데이터 이용해서 저장
document.addEventListener("DOMContentLoaded", () => {

    const question = JSON.parse(localStorage.getItem("selectedQuestion"));

    document.getElementById("category").innerText = question.category;
    document.getElementById("question-title").innerText = question.title;
    document.getElementById("question-writer").innerText = question.writer;
    document.getElementById("question-date").innerText = question.date;
    document.getElementById("question-content").innerText = question.content;

});

// 답변 버튼 클릭 시 답변 페이지로 이동 (DB 이용)
document.addEventListener("DOMContentLoaded", () => {

    const response = await fetch(`/question/detail?id=${questionId}`);
    const question = await response.json();

    if (!question) return;

    document.getElementById("question-category").textContent = question.category;
    document.getElementById("question-title").textContent = question.title;
    document.getElementById("question-content").textContent = question.content;

    document.getElementById("question-writer").innerHTML =
        `<i class="ti ti-user"></i> ${question.writer}`;

    document.getElementById("question-date").innerHTML =
        `<i class="ti ti-calendar"></i> ${question.date}`;

});

// 답변 목록 불러오기 (DB 이용)
const answerList = document.getElementById("answer-list");

answers.forEach(answer => {
    answerList.innerHTML += `
        <div class="answer-card">
            ...
        </div>
    `;
});