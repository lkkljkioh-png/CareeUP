const API = "http://localhost:8080/api/users";
const GRADUATE_PROFILE_API = "http://localhost:8080/api/graduate-profile";

window.addEventListener("DOMContentLoaded", () => {
    loadGraduateDetail();
    loadGraduateSpecs();
});

// 졸업생 기본 정보 조회
async function loadGraduateDetail() {

    const token = localStorage.getItem("token");

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    console.log("조회할 졸업생 ID:", id);

    if (!id) {
        alert("잘못된 접근입니다.");
        location.href = "profileList.html";
        return;
    }

    try {

        const response = await fetch(
            `${API}/graduates/${id}`,
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        console.log("기본 정보 응답 상태:", response.status);

        if (!response.ok) {
            alert(`프로필 조회 실패 (${response.status})`);
            return;
        }

        const result = await response.json();

        console.log("졸업생 상세 정보:", result);

        if (!result.success) {
            alert(result.message || "프로필을 불러올 수 없습니다.");
            return;
        }

        renderGraduate(result.data);

    } catch (error) {

        console.error("졸업생 상세 조회 오류:", error);

        alert("프로필을 불러오는 중 오류가 발생했습니다.");
    }
}

// 졸업생 기본 정보 출력
function renderGraduate(graduate) {

    // 이름
    document.getElementById("graduate-name").textContent =
        graduate.name ?? "이름 미등록";


    // 회사 + 직무
    let jobText = "";

    if (graduate.company) {
        jobText += graduate.company;
    }

    if (graduate.position) {

        if (jobText) {
            jobText += " · ";
        }

        jobText += graduate.position;
    }

    document.getElementById("graduate-job").textContent =
        jobText || "회사 및 직무 미등록";


    // 한마디
    document.getElementById("graduate-message").textContent =
        graduate.message || "등록된 한마디가 없습니다.";


    // 학교
    document.getElementById("graduate-school").textContent =
        graduate.school || "미등록";


    // 학과
    document.getElementById("graduate-department").textContent =
        graduate.department || "미등록";


    // 졸업년도
    document.getElementById("graduate-year").textContent =
        graduate.graduationYear
            ? `${graduate.graduationYear}년`
            : "미등록";


    // 회사
    document.getElementById("graduate-company").textContent =
        graduate.company || "미등록";


    // 직무
    document.getElementById("graduate-position").textContent =
        graduate.position || "미등록";


    // 기술 스택
    renderTechStack(graduate.techStack);
}

// 기술 스택 출력
function renderTechStack(techStack) {

    const container =
        document.getElementById("graduate-tech-stack");

    container.innerHTML = "";

    if (!techStack) {

        container.innerHTML = `
            <p class="empty-text">
                등록된 기술 스택이 없습니다.
            </p>
        `;

        return;
    }

    const skills = techStack.split(",");

    skills.forEach(skill => {

        const trimmedSkill = skill.trim();

        if (!trimmedSkill) {
            return;
        }

        const tag = document.createElement("span");

        tag.className = "skill-tag";
        tag.textContent = trimmedSkill;

        container.appendChild(tag);
    });
}

// 졸업생 스펙 조회
// 자격증 / 경력 / 대외활동
async function loadGraduateSpecs() {

    const token = localStorage.getItem("token");

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        return;
    }

    try {

        const response = await fetch(
            `${GRADUATE_PROFILE_API}/${id}`,
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        console.log("졸업생 스펙 응답 상태:", response.status);

        if (!response.ok) {

            console.error(
                `졸업생 스펙 조회 실패 (${response.status})`
            );

            return;
        }

        const result = await response.json();

        console.log("졸업생 스펙:", result);

        if (!result.success) {

            console.error(
                result.message || "졸업생 스펙 조회 실패"
            );

            return;
        }

        const data = result.data;

        renderCertificates(data.certificates);
        renderExperiences(data.experiences);
        renderActivities(data.activities);

    } catch (error) {

        console.error("졸업생 스펙 조회 오류:", error);
    }
}

// 자격증 출력
function renderCertificates(certificates) {

    const container =
        document.getElementById("graduate-certificates");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    if (!certificates || certificates.length === 0) {

        container.innerHTML = `
            <p class="empty-text">
                등록된 자격증이 없습니다.
            </p>
        `;

        return;
    }

    certificates.forEach(certificate => {

        const item = document.createElement("div");

        item.className = "spec-item";

        item.textContent =
            certificate.certificateName;

        container.appendChild(item);
    });
}

// 경력 출력
function renderExperiences(experiences) {

    const container =
        document.getElementById("graduate-experiences");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    if (!experiences || experiences.length === 0) {

        container.innerHTML = `
            <p class="empty-text">
                등록된 경력이 없습니다.
            </p>
        `;

        return;
    }

    experiences.forEach(experience => {

        const item = document.createElement("div");

        item.className = "spec-item";

        item.textContent =
            experience.experienceName;

        container.appendChild(item);
    });
}

// 대외활동 출력
function renderActivities(activities) {

    const container =
        document.getElementById("graduate-activities");

    console.log("대외활동 데이터:", activities);
    console.log("대외활동 container:", container);

    if (!container) {
        console.error("graduate-activities 요소를 찾을 수 없습니다.");
        return;
    }

    container.innerHTML = "";

    if (!activities || activities.length === 0) {

        container.innerHTML = `
            <p class="empty-text">
                등록된 대외활동이 없습니다.
            </p>
        `;

        return;
    }

    activities.forEach(activity => {

        console.log("대외활동 한 건:", activity);

        const item = document.createElement("div");

        item.className = "spec-item";

        item.textContent =
            activity.activityName || "활동명 없음";

        container.appendChild(item);
    });
}