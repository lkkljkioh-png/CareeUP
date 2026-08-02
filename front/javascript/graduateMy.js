const API = "http://localhost:8080/api/users";

window.addEventListener("DOMContentLoaded", loadMyInfo);

async function loadMyInfo() {

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

        if (result.success) {

            document.getElementById("graduate-name").textContent =
                result.data.name;

        } else {

            alert(result.message);

        }

    } catch (error) {

        console.error(error);
        alert("서버와 연결할 수 없습니다.");

    }

}