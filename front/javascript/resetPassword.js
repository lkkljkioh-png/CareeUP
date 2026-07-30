const API = "http://localhost:8080/api/users";

document.getElementById("reset-password-form")
    .addEventListener("submit", resetPassword);

async function resetPassword(event) {

    event.preventDefault();

    const userId = sessionStorage.getItem("resetUserId");
    const email = sessionStorage.getItem("resetEmail");

    const password = document.getElementById("password").value;
    const passwordCheck = document.getElementById("password-check").value;

    if (password !== passwordCheck) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
    }

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

}