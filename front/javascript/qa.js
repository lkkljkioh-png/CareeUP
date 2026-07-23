// 더미데이터
const questions = [
    {
        id: 1,
        category: "진로/취업",
        title: "백엔드 개발자가 되려면 어떤 프로젝트를 하면 좋을까요?",
        writer: "김유민",
        date: "2026-06-28",
        content: "현재 Java와 SQL을 공부하고 있습니다. 어떤 프로젝트를 하면 취업에 도움이 될까요?",
        answers: 3
    },
    {
        id: 2,
        category: "자격증",
        title: "SQLD와 정보처리기사 중 무엇을 먼저 준비해야 하나요?",
        writer: "홍길동",
        date: "2026-06-26",
        content: "둘 다 준비하려고 하는데 어떤 순서가 좋을까요?",
        answers: 5
    }
];

// 질문 목록 불러오기
let questions = JSON.parse(localStorage.getItem("questions")) || [];

document.addEventListener("DOMContentLoaded", () => {

    drawQuestions(questions);

    // 카테고리 필터
    document.getElementById("category-select").addEventListener("change", (e) => {
        filterCategory(e.target.value);
    });

    // 검색 버튼
    document.getElementById("search-btn").addEventListener("click", searchQuestion);

    // Enter 검색
    document.getElementById("question-search").addEventListener("keyup", (e) => {

        if (e.key === "Enter") {
            searchQuestion();
        }

    });

    // 질문 작성
    document.getElementById("question-upload-btn").addEventListener("click", () => {

        location.href = "../html/question.html";

    });

});

// 질문 목록 출력
function drawQuestions(list) {

    const questionList = document.getElementById("question-list");

    questionList.innerHTML = "";

    if (list.length === 0) {

        questionList.innerHTML =
            `<div class="no-question">등록된 질문이 없습니다.</div>`;

        return;

    }

    list.forEach(question => {

        questionList.innerHTML += `

        <div class="question-card" onclick="goQuestion(${question.id})">

            <div class="question-top">

                <span class="category">
                    ${question.category}
                </span>

                <span class="date">
                    ${question.date}
                </span>

            </div>

            <h3>
                ${question.title}
            </h3>

            <p>
                ${question.content}
            </p>

            <div class="question-bottom">

                <span>
                    ${question.writer}
                </span>

            </div>

        </div>

        `;

    });

}

// 질문 상세
function goQuestion(id) {

    const question = questions.find(q => q.id === id);

    localStorage.setItem(
        "selectedQuestion",
        JSON.stringify(question)
    );

    location.href = "../html/questionDetail.html";

}

// 검색
function searchQuestion() {

    const keyword =
        document.getElementById("question-search")
        .value
        .trim()
        .toLowerCase();

    const result = questions.filter(question =>

        question.title.toLowerCase().includes(keyword) ||

        question.content.toLowerCase().includes(keyword) ||

        question.writer.toLowerCase().includes(keyword)

    );

    drawQuestions(result);

}

// 카테고리 필터
function filterCategory(category) {

    if (category === "전체") {

        drawQuestions(questions);

        return;

    }

    const result = questions.filter(question =>

        question.category === category

    );

    drawQuestions(result);

}