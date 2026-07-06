// 재학생, 졸업생 별로 MY 페이지 이동 
function goMyPage() {

    const loginUser = JSON.parse(localStorage.getItem("loginUser"));

    if (!loginUser) {
        alert("로그인 후 이용해주세요.");
        location.href = "../html/login.html";
        return;
    }

    if (loginUser.membershipType === "재학생") {
        location.href = "../html/studentMy.html";
    } else {
        location.href = "../html/graduateMy.html";
    }

}

// 재학생, 졸업생 별로 프로필 페이지 이동
function goProfile() {

    const loginUser = JSON.parse(localStorage.getItem("loginUser"));

    if (!loginUser) {
        alert("로그인 후 이용해주세요.");
        location.href = "../html/login.html";
        return;
    }

    if (loginUser.membershipType === "재학생") {
        location.href = "../html/studentProfile.html";
    } else {
        location.href = "../html/graduateProfile.html";
    }

}

// 로그아웃 기능
function logout() {

    // 로그인 정보 삭제
    localStorage.removeItem("loginUser");

    alert("로그아웃되었습니다.");

    // 로그인 페이지로 이동
    location.href = "../html/login.html";
}

// 로그인, 로그아웃 알아서 판단 후 처
document.addEventListener("DOMContentLoaded", () => {

    const loginMenu = document.getElementById("login-menu");

    if (!loginMenu) return;

    const loginUser = JSON.parse(localStorage.getItem("loginUser"));

    if (loginUser) {

        loginMenu.innerText = "LOGOUT";
        loginMenu.href = "#";
        loginMenu.onclick = logout;

    } else {

        loginMenu.innerText = "LOGIN";
        loginMenu.href = "../html/login.html";

    }

});