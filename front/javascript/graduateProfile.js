const API = "http://localhost:8080/api/users";
const PROFILE_API = "http://localhost:8080/api/graduate-profile";

window.addEventListener("DOMContentLoaded", () => {
    loadGraduateProfile();
    loadGraduateActivities();
});


// 졸업생 기본 정보
async function loadGraduateProfile() {

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

            document.getElementById("graduate-school").textContent =
                result.data.school || "학교 정보 없음";

            document.getElementById("graduate-dept").textContent =
                result.data.department || "학과 정보 없음";

            document.getElementById("graduate-year").textContent =
                result.data.graduationYear || "졸업년도 정보 없음";

            document.getElementById("graduate-company").textContent =
                result.data.company || "회사 정보 없음";

            document.getElementById("graduate-position").textContent =
                result.data.position || "직무 정보 없음";

            document.getElementById("graduate-tech-stack").textContent =
                result.data.techStack || "기술 스택 없음";

            document.getElementById("graduate-message").textContent =
                result.data.message || "작성된 한마디가 없습니다.";

        } else {
            alert(result.message);
        }

    } catch (error) {

        console.error(error);
        alert("서버와 연결할 수 없습니다.");

    }
}


// 경력 / 자격증 / 대외활동
async function loadGraduateActivities() {

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

        if (!result.success) {
            console.error(result.message);
            return;
        }

        // 경력
        const experienceList =
            document.getElementById("experience-list");

        experienceList.innerHTML = "";

        result.data.experiences.forEach(experience => {

            const item = document.createElement("div");

            item.className = "list-item";

            item.textContent = experience.experienceName;

            experienceList.appendChild(item);
        });


        // 자격증
        const certificateList =
            document.getElementById("certificate-list");

        certificateList.innerHTML = "";

        result.data.certificates.forEach(certificate => {

            const item = document.createElement("div");

            item.className = "list-item";

            item.textContent = certificate.certificateName;

            certificateList.appendChild(item);
        });


        // 대외활동
        const activityList =
            document.getElementById("external-activities-list");

        activityList.innerHTML = "";

        result.data.activities.forEach(activity => {

            const item = document.createElement("div");

            item.className = "list-item";

            item.textContent = activity.activityName;

            activityList.appendChild(item);
        });

    } catch (error) {

        console.error(error);
        alert("프로필 활동 정보를 불러올 수 없습니다.");

    }
}