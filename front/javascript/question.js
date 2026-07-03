// 질문 등록
function addQuestion() {

    const category = document.getElementById("question-category").value;
    const title = document.getElementById("question-title").value.trim();
    const content = document.getElementById("question-content").value.trim();

    if (category === "전체") {
        alert("카테고리를 선택해주세요.");
        return;
    }

    if (title === "") {
        alert("제목을 입력해주세요.");
        return;
    }

    if (content === "") {
        alert("질문 내용을 입력해주세요.");
        return;
    }

    // 로그인한 사용자
    const loginUser = JSON.parse(localStorage.getItem("loginUser"));

    if (!loginUser) {
        alert("로그인 후 이용해주세요.");
        location.href = "../html/login.html";
        return;
    }

    // 질문 목록
    const questions =
        JSON.parse(localStorage.getItem("questions")) || [];

    // 질문 생성
    const question = {

        id: Date.now(),

        category: category,

        title: title,

        writer: loginUser.name,

        date: new Date().toLocaleDateString("ko-KR"),

        content: content

    };

    questions.push(question);

    localStorage.setItem(
        "questions",
        JSON.stringify(questions)
    );

    alert("질문이 등록되었습니다.");

    location.href = "qa.html";

}