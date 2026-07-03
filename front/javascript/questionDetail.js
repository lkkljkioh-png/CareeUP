document.addEventListener("DOMContentLoaded", () => {

    // 선택한 질문 가져오기
    const question = JSON.parse(localStorage.getItem("selectedQuestion"));

    if (!question) {
        alert("질문 정보를 찾을 수 없습니다.");
        location.href = "../html/qa.html";
        return;
    }

    // 질문 출력
    document.getElementById("category").innerText = question.category;
    document.getElementById("question-title").innerText = question.title;
    document.getElementById("question-writer").innerText = question.writer;
    document.getElementById("question-date").innerText = question.date;
    document.getElementById("question-content").innerText = question.content;

    // 답변 출력
    loadAnswers(question.id);

});

// 답변 목록 출력
function loadAnswers(questionId) {

    const answers = JSON.parse(localStorage.getItem("answers")) || [];

    const answerList = document.getElementById("answer-list");

    if (!answerList) return;

    answerList.innerHTML = "";

    const questionAnswers = answers.filter(answer =>

        answer.questionId === questionId

    );

    if (questionAnswers.length === 0) {

        answerList.innerHTML = `
            <div class="no-answer">
                아직 등록된 답변이 없습니다.
            </div>
        `;

        return;

    }

    questionAnswers.forEach(answer => {

        answerList.innerHTML += `

            <div class="answer-card">

                <div class="answer-header">

                    <span class="answer-writer">
                        <i class="ti ti-user"></i>
                        ${answer.writer}
                    </span>

                    <span class="answer-date">
                        <i class="ti ti-calendar"></i>
                        ${answer.date}
                    </span>

                </div>

                <div class="answer-content">
                    ${answer.content}
                </div>

            </div>

        `;

    });

}

// 답변 작성 페이지 이동
function goAnswer() {

    location.href = "../html/answer.html";

}
