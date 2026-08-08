const API = "http://localhost:8080/api/users";

window.addEventListener("DOMContentLoaded", loadProfile);

async function loadProfile() {

    const token = localStorage.getItem("token");

    if (!token) {
        alert("로그인이 필요합니다.");
        location.href = "login.html";
        return;
    }

    try {

        const response = await fetch(API + "/me", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const result = await response.json();

        console.log(result);

        if (result.success) {

            document.getElementById("graduate-name").textContent =
                result.data.name ?? "사용자";

            document.getElementById("graduate-company").textContent =
                result.data.company ?? "회사 정보 없음";

            document.getElementById("graduate-position").textContent =
                result.data.position ?? "직무 정보 없음";

        } else {

            alert(result.message);

        }

    } catch(error) {

        console.error(error);

    }
}