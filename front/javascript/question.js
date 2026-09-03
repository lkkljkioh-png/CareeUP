console.log("question.js 실행됨");

const QUESTION_API = "http://localhost:8080/api/questions";

async function addQuestion() {

    const token = localStorage.getItem("token");

    console.log("token:", token);

    if (!token) {
        alert("로그인이 필요합니다.");
        location.href = "login.html";
        return;
    }

    const category =
        document.getElementById("question-category").value;

    const title =
        document.getElementById("question-title").value.trim();

    const content =
        document.getElementById("question-content").value.trim();

    if (!category) {
        alert("카테고리를 선택해주세요.");
        return;
    }

    if (!title) {
        alert("제목을 입력해주세요.");
        return;
    }

    if (!content) {
        alert("내용을 입력해주세요.");
        return;
    }

    try {

        console.log("보내는 category:", category);

        const response = await fetch(
            "http://localhost:8080/api/questions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    title: title,
                    content: content,
                    category: category
                })
            }
        );

        console.log("HTTP status:", response.status);

        const text = await response.text();

        console.log("서버 응답:", text);

        if (!response.ok) {
            alert("질문 등록 실패: " + response.status);
            return;
        }

        const result = JSON.parse(text);

        if (!result.success) {
            alert(result.message || "질문 등록에 실패했습니다.");
            return;
        }

        alert("질문이 등록되었습니다.");

        location.href = "qa.html";

    } catch (error) {

        console.error("질문 등록 실제 오류:", error);

        alert("질문 등록 중 오류가 발생했습니다.");
    }
}