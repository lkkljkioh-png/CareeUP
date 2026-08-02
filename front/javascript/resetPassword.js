const API = "http://localhost:8080/api/users";

document.getElementById("reset-password-form")
    .addEventListener("submit", resetPassword);

async function resetPassword(event) {

    event.preventDefault();

    const userId = sessionStorage.getItem("resetUserId");
    const email = sessionStorage.getItem("resetEmail");

    const password = document.getElementById("password").value;
    const passwordCheck = document.getElementById("password-check").value;

    // 공백 검사
    if (!password || !passwordCheck) {
        alert("비밀번호를 입력해주세요.");
        return;
    }

    // 길이 검사
    if (password.length < 8) {
        alert("비밀번호는 8자 이상 입력해주세요.");
        return;
    }

    // 비밀번호 확인
    if (password !== passwordCheck) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
    }

    try {

        const response = await fetch(API + "/reset-password", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId,
                email,
                password
            })
        });

        const result = await response.json();

        if (result.success) {

            alert(result.message);

            sessionStorage.removeItem("resetUserId");
            sessionStorage.removeItem("resetEmail");

            location.href = "login.html";

        } else {

            alert(result.message);

        }

    } catch (error) {

        console.error(error);
        alert("서버와 연결할 수 없습니다.");

    }
}