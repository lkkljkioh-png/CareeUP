console.log("graduateMy.js 실행됨");

const API = "http://localhost:8080/api/users";
const PROFILE_API = "http://localhost:8080/api/graduate-profile";

window.addEventListener("DOMContentLoaded", () => {
    loadProfile();
    loadActivityCounts();
});

// 이름, 회사, 직무 조회
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

        console.log("졸업생 MY 응답:", result);

        if (!response.ok || !result.success) {
            alert(result.message || "회원 정보를 불러오지 못했습니다.");
            return;
        }

        const user = result.data;

        document.getElementById("graduate-name").textContent =
            user.name || "사용자";

        document.getElementById("graduate-company").textContent =
            user.company || "회사 정보 없음";

        document.getElementById("graduate-position").textContent =
            user.position || "직무 정보 없음";

    } catch (error) {
        console.error("졸업생 MY 페이지 오류:", error);
        alert("서버와 연결할 수 없습니다.");
    }
}

// 자격증, 대외활동, 경력 개수 조회
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

        console.log("졸업생 활동 개수 응답:", result);

        if (!response.ok || !result.success) {
            console.error(
                result.message || "활동 정보를 불러오지 못했습니다."
            );
            return;
        }

        const profile = result.data || {};

        const certificates = profile.certificates || [];
        const activities = profile.activities || [];
        const experiences = profile.experiences || [];

        document.getElementById("certificate-count").textContent =
            certificates.length;

        document.getElementById("external-activities-count").textContent =
            activities.length;

        document.getElementById("experience-count").textContent =
            experiences.length;

    } catch (error) {
        console.error("졸업생 활동 개수 조회 오류:", error);
    }
}