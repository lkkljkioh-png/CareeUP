window.addEventListener("DOMContentLoaded", updateStartButton);

function updateStartButton() {
    const token = localStorage.getItem("token");
    const startButton = document.getElementById("start-button");

    if (!startButton) {
        return;
    }

    if (token) {
        startButton.innerHTML = `
      내 프로필 보기
      <i class="ti ti-arrow-right"></i>
    `;
    }
}

function startCareeUP() {
    const token = localStorage.getItem("token");
    const membershipType = localStorage.getItem("membershipType");

    // 비로그인 사용자
    if (!token) {
        location.href = "login.html";
        return;
    }

    // 로그인한 재학생
    if (membershipType === "student") {
        location.href = "studentProfile.html";
        return;
    }

    // 로그인한 졸업생
    if (membershipType === "graduate") {
        location.href = "graduateProfile.html";
        return;
    }

    // 역할 정보가 없거나 비정상인 경우 재로그인
    localStorage.removeItem("token");
    localStorage.removeItem("membershipType");

    alert("로그인 정보를 다시 확인해주세요.");
    location.href = "login.html";
}