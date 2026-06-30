document.addEventListener("DOMContentLoaded", () => {

    const submitBtn = document.querySelector(".submit");
    const textarea = document.querySelector("textarea");

    submitBtn.addEventListener("click", () => {

        const answer = textarea.value.trim();

        if (answer === "") {
            alert("답변을 입력해주세요.");
            textarea.focus();
            return;
        }

        // 답변 객체 생성
        const answerData = {
            writer: "홍길동", // 더미데이터 (DB구축 후 실제 구현 시 로그인한 사용자 정보로 대체)
            content: answer,
            date: new Date().toLocaleDateString()
        };

        // 기존 답변 불러오기
        const answers = JSON.parse(localStorage.getItem("answers")) || [];

        // 새 답변 추가
        answers.push(answerData);

        // 저장
        localStorage.setItem("answers", JSON.stringify(answers));

        alert("답변이 등록되었습니다.");

        // 페이지 이동
        location.href = "../html/questionDetail.html";
    });

});