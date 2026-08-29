const API = "http://localhost:8080/api/users";
const GRADUATE_PROFILE_API = "http://localhost:8080/api/graduate-profile";
const BOOKMARK_API = "http://localhost:8080/api/bookmarks/graduates";

let isFavoriteGraduate = false;

window.addEventListener("DOMContentLoaded", () => {
    loadGraduateDetail();
    loadGraduateSpecs();
    initializeFavoriteButton();
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

// 관심 졸업생 버튼 초기화
function initializeFavoriteButton() {

    const button =
        document.getElementById("favorite-button");

    const token =
        localStorage.getItem("token");

    const membershipType =
        localStorage.getItem("membershipType");

    console.log("즐겨찾기 버튼:", button);
    console.log("회원 유형:", membershipType);
    console.log("토큰 존재:", Boolean(token));

    if (!button) {
        console.error("favorite-button을 찾을 수 없습니다.");
        return;
    }

    if (!token) {
        button.style.display = "none";
        return;
    }

    if (membershipType !== "student") {
        button.style.display = "none";
        return;
    }

    button.style.display = "inline-flex";

    // 클릭 이벤트 연결
    button.onclick = toggleFavoriteGraduate;

    loadFavoriteStatus();
}

// 현재 졸업생 ID 가져오기
function getFavoriteGraduateId() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    return params.get("id");
}

// 관심 등록 여부 조회
async function loadFavoriteStatus() {

    const token =
        localStorage.getItem("token");

    const graduateId =
        getFavoriteGraduateId();

    if (!graduateId) {
        return;
    }

    try {

        const response = await fetch(
            `${BOOKMARK_API}/${graduateId}/status`,
            {
                method: "GET",
                headers: {
                    "Authorization":
                        "Bearer " + token
                }
            }
        );

        const result =
            await response.json();

        if (!response.ok || !result.success) {
            throw new Error(
                result.message
                || "관심 등록 여부 조회 실패"
            );
        }

        isFavoriteGraduate =
            result.data === true;

        renderFavoriteButton();

    } catch (error) {

        console.error(
            "관심 등록 여부 조회 오류:",
            error
        );
    }
}

// 관심 졸업생 등록 또는 해제
async function toggleFavoriteGraduate() {

    const token =
        localStorage.getItem("token");

    const graduateId =
        getFavoriteGraduateId();

    const button =
        document.getElementById(
            "favorite-button"
        );

    if (!graduateId || !button) {
        return;
    }

    button.disabled = true;

    try {

        const response = await fetch(
            `${BOOKMARK_API}/${graduateId}`,
            {
                method:
                    isFavoriteGraduate
                        ? "DELETE"
                        : "POST",

                headers: {
                    "Authorization":
                        "Bearer " + token
                }
            }
        );

        const result =
            await response.json();

        if (!response.ok || !result.success) {
            throw new Error(
                result.message
                || "관심 등록 처리 실패"
            );
        }

        isFavoriteGraduate =
            !isFavoriteGraduate;

        renderFavoriteButton();

    } catch (error) {

        console.error(
            "관심 졸업생 처리 오류:",
            error
        );

        alert(error.message);

    } finally {

        button.disabled = false;
    }
}

// 버튼 모양 변경
function renderFavoriteButton() {

    const button =
        document.getElementById(
            "favorite-button"
        );

    if (!button) {
        return;
    }

    button.classList.toggle(
        "active",
        isFavoriteGraduate
    );

    button.setAttribute(
        "aria-pressed",
        String(isFavoriteGraduate)
    );

    button
        .querySelector(".favorite-icon")
        .textContent =
        isFavoriteGraduate
            ? "♥"
            : "♡";

    button
        .querySelector(".favorite-text")
        .textContent =
        isFavoriteGraduate
            ? "관심 등록됨"
            : "관심 등록";
}