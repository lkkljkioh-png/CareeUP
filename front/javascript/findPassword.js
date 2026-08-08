const API = "http://localhost:8080/api/users";

document.getElementById("find-password-form")
    .addEventListener("submit", findPassword);

async function findPassword(event) {
    event.preventDefault();

    const userId = document.getElementById("user-id").value;
    const email = document.getElementById("email").value;

    const response = await fetch(API + "/check-user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId,
            email
        })
    });

    const result = await response.json();

    if (result.data) {

        // 다음 페이지에서 사용할 정보 저장
        sessionStorage.setItem("resetUserId", userId);
        sessionStorage.setItem("resetEmail", email);

        location.href = "resetPassword.html";

    } else {

        alert("아이디 또는 이메일이 일치하지 않습니다.");

    }
}