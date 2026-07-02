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

// 질문 상세 페이지로 이동 시 선택된 질문 정보를 localStorage에 저장 (DB 구축 후 변경 필요)

function goQuestion(id) {

    const question = questions.find(q => q.id === id);

    localStorage.setItem("selectedQuestion", JSON.stringify(question));

    location.href = "../html/questionDetail.html";
}

// 카테고리 필터링 기능
document.getElementById("category-select").addEventListener("change", (e) => {
    filterCategory(e.target.value);
});

// 질문 검색 기능
document.getElementById("search-btn").addEventListener("click", searchQuestion);

// 질문 검색 기능 (Enter 키 입력 시에도 검색)
document.getElementById("question-search").addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        searchQuestion();
    }
});

// 질문 작성 버튼 클릭 시 이동
document.getElementById("question-upload-btn").addEventListener("click", () => {
    location.href = "../html/question.html";
});