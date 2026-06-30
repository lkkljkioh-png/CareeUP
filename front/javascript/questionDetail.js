document.addEventListener("DOMContentLoaded", () => {

    const question = JSON.parse(localStorage.getItem("selectedQuestion"));

    document.getElementById("category").innerText = question.category;
    document.getElementById("question-title").innerText = question.title;
    document.getElementById("question-writer").innerText = question.writer;
    document.getElementById("question-date").innerText = question.date;
    document.getElementById("question-content").innerText = question.content;

});