console.log("studentMy.js 실행됨");

const API = "http://localhost:8080/api/users";
const PROFILE_API = "http://localhost:8080/api/student-profile";

window.addEventListener("DOMContentLoaded", () => {
    loadMyInfo();
    loadActivityCounts();
});

// 이름, 학교, 학과 조회
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

        if (!response.ok || !result.success) {
            alert(result.message || "회원 정보를 불러오지 못했습니다.");
            return;
        }

        const user = result.data;

        document.getElementById("student-name").textContent =
            user.name || "-";

        document.getElementById("student-school").textContent =
            user.school || "학교 정보 없음";

        document.getElementById("student-department").textContent =
            user.department || "학과 정보 없음";

    } catch (error) {
        console.error("MY 페이지 오류:", error);
        alert("서버와 연결할 수 없습니다.");
    }
}

// 자격증, 대외활동 개수 조회
async function loadActivityCounts() {
    const token = localStorage.getItem("token");

    if (!token) {
        return;
    }

    try {
        const response = await fetch(PROFILE_API, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const result = await response.json();

        console.log("활동 개수 응답:", result);

        if (!response.ok || !result.success) {
            console.error(result.message || "활동 정보를 불러오지 못했습니다.");
            return;
        }

        const profile = result.data;

        const certificates = profile.certificates || [];
        const activities = profile.activities || [];
        const projects = profile.projects || [];

        document.getElementById("certificate-count").textContent =
            certificates.length;

        document.getElementById("external-activities-count").textContent =
            activities.length;

        document.getElementById("project-count").textContent =
            projects.length;
            
    } catch (error) {
        console.error("활동 개수 조회 오류:", error);
    }
}