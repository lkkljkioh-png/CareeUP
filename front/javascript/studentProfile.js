const API = "http://localhost:8080/api/users";
const PROFILE_API = "http://localhost:8080/api/student-profile";

window.addEventListener("DOMContentLoaded", () => {
    loadStudentProfile();
    loadStudentActivities();
});


// 재학생 기본 정보
async function loadStudentProfile() {

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

            document.getElementById("student-name").textContent =
                result.data.name;

            document.getElementById("student-school").textContent =
                result.data.school || "학교 정보 없음";

            document.getElementById("student-dept").textContent =
                result.data.department || "학과 정보 없음";

            document.getElementById("grade").textContent =
                result.data.grade || "학년 정보 없음";

            document.getElementById("student-desired-job").textContent =
                result.data.desiredJob || "희망 직무 정보 없음";

            document.getElementById("student-tech-stack").textContent =
                result.data.techStack || "기술 스택 정보 없음";

            document.getElementById("student-message").textContent =
                result.data.message || "작성된 한마디가 없습니다.";

        } else {

            alert(result.message);

        }

    } catch (error) {

        console.error(error);
        alert("서버와 연결할 수 없습니다.");

    }
}


// 프로젝트 / 자격증 / 대외활동
async function loadStudentActivities() {

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


        // 프로젝트
        const projectList =
            document.getElementById("project-list");

        projectList.innerHTML = "";

        result.data.projects.forEach(project => {

            const item = document.createElement("div");

            item.className = "list-item";

            item.textContent = project.projectName;

            projectList.appendChild(item);
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
            document.getElementById("activity-list");

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