console.log("studentMy.js 실행됨");

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

        console.log("MY 응답:", result);

        if (result.success) {

            const user = result.data;

            document.getElementById("student-name").textContent =
                user.name || "-";

            document.getElementById("student-school").textContent =
                user.school || "학교 정보 없음";

            document.getElementById("student-department").textContent =
                user.department || "학과 정보 없음";

        } else {
            alert(result.message);
        }

    } catch (error) {
        console.error("MY 페이지 오류:", error);
        alert("서버와 연결할 수 없습니다.");
    }
}