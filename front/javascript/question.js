console.log("question.js 실행됨");

const QUESTION_API = "http://localhost:8080/api/questions";


// ==========================
// 질문 등록
// ==========================
async function addQuestion() {

    const token = localStorage.getItem("token");
    const membershipType = localStorage.getItem("membershipType");

    console.log("token:", token);
    console.log("membershipType:", membershipType);

    // 로그인 확인
    if (!token) {
        alert("로그인이 필요합니다.");
        location.href = "login.html";
        return;
    }

    // 재학생 확인
    if (membershipType !== "student") {
        alert("재학생만 질문을 작성할 수 있습니다.");
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

        console.log("질문 등록 요청 시작");

        const response = await fetch(
            QUESTION_API,
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

        const result = await response.json();

        console.log("질문 등록 응답:", result);


        if (!response.ok || !result.success) {

            alert(
                result.message ||
                "질문 등록에 실패했습니다."
            );

            return;
        }


        alert("질문이 등록되었습니다.");

        location.href = "qa.html";


    } catch (error) {

        console.error("질문 등록 오류:", error);

        alert("서버에 연결할 수 없습니다.");
    }
}