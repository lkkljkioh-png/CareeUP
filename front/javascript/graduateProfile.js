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

            const text = document.createElement("span");
            text.textContent = experience.experienceName;

            const deleteButton = document.createElement("button");

            deleteButton.type = "button";
            deleteButton.className = "delete-btn";
            deleteButton.innerHTML = '<i class="ti ti-trash"></i>';

            deleteButton.addEventListener("click", () => {
                deleteExperience(experience.id);
            });

            item.appendChild(text);
            item.appendChild(deleteButton);

            experienceList.appendChild(item);
        });


        const certificateList =
            document.getElementById("certificate-list");

        certificateList.innerHTML = "";

        result.data.certificates.forEach(certificate => {

            const item = document.createElement("div");
            item.className = "list-item";

            const text = document.createElement("span");
            text.textContent = certificate.certificateName;

            const deleteButton = document.createElement("button");

            deleteButton.type = "button";
            deleteButton.className = "delete-btn";
            deleteButton.innerHTML = '<i class="ti ti-trash"></i>';

            deleteButton.addEventListener("click", () => {
                deleteCertificate(certificate.id);
            });

            item.appendChild(text);
            item.appendChild(deleteButton);

            certificateList.appendChild(item);
        });


        const activityList =
            document.getElementById("external-activities-list");

        activityList.innerHTML = "";

        result.data.activities.forEach(activity => {

            const item = document.createElement("div");
            item.className = "list-item";

            const text = document.createElement("span");
            text.textContent = activity.activityName;

            const deleteButton = document.createElement("button");

            deleteButton.type = "button";
            deleteButton.className = "delete-btn";
            deleteButton.innerHTML = '<i class="ti ti-trash"></i>';

            deleteButton.addEventListener("click", () => {
                deleteActivity(activity.id);
            });

            item.appendChild(text);
            item.appendChild(deleteButton);

            activityList.appendChild(item);
        });

    } catch (error) {

        console.error(error);
        alert("프로필 활동 정보를 불러올 수 없습니다.");

    }

    async function deleteExperience(experienceId) {

        if (!confirm("이 경력을 삭제하시겠습니까?")) {
            return;
        }

        const token = localStorage.getItem("token");

        try {

            const response = await fetch(
                PROFILE_API + "/experiences/" + experienceId,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            );

            const result = await response.json();

            if (result.success) {
                alert("경력이 삭제되었습니다.");
                loadGraduateActivities();
            } else {
                alert(result.message);
            }

        } catch (error) {
            console.error(error);
            alert("경력 삭제 중 오류가 발생했습니다.");
        }
    }


    async function deleteCertificate(certificateId) {

        if (!confirm("이 자격증을 삭제하시겠습니까?")) {
            return;
        }

        const token = localStorage.getItem("token");

        try {

            const response = await fetch(
                PROFILE_API + "/certificates/" + certificateId,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            );

            const result = await response.json();

            if (result.success) {
                alert("자격증이 삭제되었습니다.");
                loadGraduateActivities();
            } else {
                alert(result.message);
            }

        } catch (error) {
            console.error(error);
            alert("자격증 삭제 중 오류가 발생했습니다.");
        }
    }

    // 삭제 함수
    async function deleteActivity(activityId) {

        if (!confirm("이 대외활동을 삭제하시겠습니까?")) {
            return;
        }

        const token = localStorage.getItem("token");

        try {

            const response = await fetch(
                PROFILE_API + "/activities/" + activityId,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            );

            const result = await response.json();

            if (result.success) {
                alert("대외활동이 삭제되었습니다.");
                loadGraduateActivities();
            } else {
                alert(result.message);
            }

        } catch (error) {
            console.error(error);
            alert("대외활동 삭제 중 오류가 발생했습니다.");
        }
    }
}