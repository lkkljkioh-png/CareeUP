window.addEventListener("DOMContentLoaded", () => {
    updateLoginMenu();
});

function updateLoginMenu() {
    const token = localStorage.getItem("token");
    const loginMenu = document.getElementById("login-menu");

    if (!loginMenu) return;

    if (token) {
        loginMenu.textContent = "LOGOUT";
        loginMenu.href = "#";

        loginMenu.onclick = function (event) {
            event.preventDefault();
            logout();
        };
    } else {
        loginMenu.textContent = "LOGIN";
        loginMenu.href = "login.html";
    }
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("userId");
    localStorage.removeItem("membershipType");

    alert("로그아웃되었습니다.");
    window.location.href = "main.html";
}

function goMyPage() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("membershipType");

    if (!token) {
        alert("로그인이 필요합니다.");
        location.href = "login.html";
        return;
    }

    if (role === "student") {
        location.href = "studentMy.html";
    } else if (role === "graduate") {
        location.href = "graduateMy.html";
    }
}

function goProfile() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("membershipType");

    if (!token) {
        alert("로그인이 필요합니다.");
        location.href = "login.html";
        return;
    }

    if (role === "student") {
        location.href = "studentProfile.html";
    } else if (role === "graduate") {
        location.href = "graduateProfile.html";
    }
}