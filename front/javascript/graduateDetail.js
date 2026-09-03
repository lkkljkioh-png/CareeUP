const API = "http://localhost:8080/api/users";
const GRADUATE_PROFILE_API = "http://localhost:8080/api/graduate-profile";
const BOOKMARK_API = "http://localhost:8080/api/bookmarks/graduates";
const PROFILE_COMPARISON_API =
    "http://localhost:8080/api/profile-comparisons/graduates";
const RECENT_GRADUATES_KEY = "recentGraduates";
const RECENT_GRADUATES_MAX = 5;

let isFavoriteGraduate = false;

window.addEventListener("DOMContentLoaded", () => {
    loadGraduateDetail();
    loadGraduateSpecs();
    initializeFavoriteButton();
    initializeComparisonButton();
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

        saveRecentGraduate(result.data);

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

function saveRecentGraduate(graduate) {

    if (!graduate || !graduate.id) {
        return;
    }

    const recentGraduate = {
        id: graduate.id,
        name: graduate.name ?? "",
        company: graduate.company ?? "",
        position: graduate.position ?? "",
        school: graduate.school ?? "",
        department: graduate.department ?? "",
        graduationYear: graduate.graduationYear ?? ""
    };

    let recentGraduates = [];

    try {
        const saved = localStorage.getItem(RECENT_GRADUATES_KEY);

        if (saved) {
            recentGraduates = JSON.parse(saved);
        }
    } catch (error) {
        console.error("최근 본 졸업생 데이터 읽기 실패:", error);
        recentGraduates = [];
    }

    // 같은 졸업생이 이미 있으면 제거
    recentGraduates = recentGraduates.filter(
        graduateItem => Number(graduateItem.id) !== Number(recentGraduate.id)
    );

    // 방금 본 졸업생을 맨 앞에 추가
    recentGraduates.unshift(recentGraduate);

    // 최대 5명까지만 유지
    recentGraduates = recentGraduates.slice(0, RECENT_GRADUATES_MAX);

    localStorage.setItem(
        RECENT_GRADUATES_KEY,
        JSON.stringify(recentGraduates)
    );

    console.log("최근 본 졸업생 저장:", recentGraduates);
}

// 프로필 비교 버튼 초기화
function initializeComparisonButton() {

    const button =
        document.getElementById("compare-button");

    const token =
        localStorage.getItem("token");

    const membershipType =
        localStorage.getItem("membershipType");

    if (!button) {
        return;
    }

    if (!token || membershipType !== "student") {
        button.hidden = true;
        return;
    }

    button.hidden = false;

    button.addEventListener(
        "click",
        loadProfileComparison
    );
}

// 프로필 비교 조회
async function loadProfileComparison() {

    const button =
        document.getElementById("compare-button");

    const section =
        document.getElementById(
            "comparison-section"
        );

    const status =
        document.getElementById(
            "comparison-status"
        );

    const graduateId =
        getFavoriteGraduateId();

    const token =
        localStorage.getItem("token");

    if (!button
        || !section
        || !status
        || !graduateId) {

        return;
    }

    section.hidden = false;

    status.textContent =
        "프로필을 비교하고 있습니다.";

    status.classList.remove("error");

    button.disabled = true;

    try {

        const response = await fetch(
            `${PROFILE_COMPARISON_API}/${graduateId}`,
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
                || "프로필 비교에 실패했습니다."
            );
        }

        renderProfileComparison(result.data);

        status.textContent = "";

        button.textContent =
            "비교 결과 다시 보기";

        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    } catch (error) {

        console.error(
            "프로필 비교 오류:",
            error
        );

        status.textContent =
            error.message;

        status.classList.add("error");

    } finally {

        button.disabled = false;
    }
}

// 프로필 비교 결과 출력
function renderProfileComparison(comparison) {

    const completedCount =
        document.getElementById(
            "comparison-completed-count"
        );

    const scoreLabel =
        document.getElementById(
            "comparison-score-label"
        );

    document.getElementById(
        "comparison-graduate-name"
    ).textContent =
        comparison.graduateName
        || "졸업생";

    completedCount.textContent =
        comparison.comparableCategoryCount === 0
            ? "-"
            : comparison.completedCategoryCount;

    scoreLabel.textContent =
        comparison.comparableCategoryCount === 0
            ? "비교 정보 없음"
            : `/ ${comparison.comparableCategoryCount}개 기준 충족`;

    const progress =
        comparison.comparableCategoryCount === 0
            ? 0
            : comparison.completedCategoryCount
            / comparison.comparableCategoryCount
            * 100;

    document.getElementById(
        "comparison-progress-bar"
    ).style.width =
        `${progress}%`;

    const hasTechReference =
        comparison.commonTechStacks.length
        + comparison.missingTechStacks.length
        > 0;

    const hasCertificateReference =
        comparison.commonCertificates.length
        + comparison.missingCertificates.length
        > 0;

    renderComparisonTags(
        "common-tech-list",
        comparison.commonTechStacks,
        hasTechReference
            ? "공통 기술이 없습니다."
            : "졸업생의 등록 정보가 없습니다.",
        "common"
    );

    renderComparisonTags(
        "missing-tech-list",
        comparison.missingTechStacks,
        hasTechReference
            ? "부족한 기술이 없습니다."
            : "비교할 정보가 없습니다.",
        "missing"
    );

    renderComparisonTags(
        "common-certificate-list",
        comparison.commonCertificates,
        hasCertificateReference
            ? "공통 자격증이 없습니다."
            : "졸업생의 등록 정보가 없습니다.",
        "common"
    );

    renderComparisonTags(
        "missing-certificate-list",
        comparison.missingCertificates,
        hasCertificateReference
            ? "부족한 자격증이 없습니다."
            : "비교할 정보가 없습니다.",
        "missing"
    );

    renderComparisonStatus(
        "tech-status",
        hasTechReference,
        comparison.missingTechStacks.length === 0,
        comparison.missingTechStacks.length
    );

    renderComparisonStatus(
        "certificate-status",
        hasCertificateReference,
        comparison.missingCertificates.length === 0,
        comparison.missingCertificates.length
    );

    renderCountComparison(
        comparison.projectExperience,
        "student-project-count",
        "graduate-experience-count",
        "project-status",
        "project-gap-message",
        "프로젝트·경험"
    );

    renderCountComparison(
        comparison.activity,
        "student-activity-count",
        "graduate-activity-count",
        "activity-status",
        "activity-gap-message",
        "대외활동"
    );
}

// 비교 태그 출력
function renderComparisonTags(
    containerId,
    values,
    emptyMessage,
    type
) {

    const container =
        document.getElementById(containerId);

    if (!container) {
        return;
    }

    container.replaceChildren();

    if (!values || values.length === 0) {

        const empty =
            document.createElement("span");

        empty.className =
            "comparison-empty";

        empty.textContent =
            emptyMessage;

        container.appendChild(empty);

        return;
    }

    values.forEach(value => {

        const tag =
            document.createElement("span");

        tag.className =
            `comparison-tag ${type}`;

        tag.textContent =
            value;

        container.appendChild(tag);
    });
}

// 비교 상태 출력
function renderComparisonStatus(
    elementId,
    comparable,
    sufficient,
    missingCount
) {

    const element =
        document.getElementById(elementId);

    if (!element) {
        return;
    }

    element.classList.toggle(
        "neutral",
        !comparable
    );

    element.classList.toggle(
        "complete",
        comparable && sufficient
    );

    element.classList.toggle(
        "needs",
        comparable && !sufficient
    );

    if (!comparable) {

        element.textContent =
            "비교 정보 없음";

        return;
    }

    element.textContent =
        sufficient
            ? "충족"
            : `${missingCount}개 부족`;
}

// 개수 비교 출력
function renderCountComparison(
    comparison,
    studentCountId,
    graduateCountId,
    statusId,
    messageId,
    label
) {

    document.getElementById(
        studentCountId
    ).textContent =
        comparison.studentCount;

    document.getElementById(
        graduateCountId
    ).textContent =
        comparison.graduateCount;

    renderComparisonStatus(
        statusId,
        comparison.comparable,
        comparison.sufficient,
        comparison.gap
    );

    const message =
        document.getElementById(messageId);

    if (!comparison.comparable) {

        message.textContent =
            `졸업생의 ${label} 정보가 없어 비교할 수 없습니다.`;

        return;
    }

    message.textContent =
        comparison.sufficient
            ? `${label} 수가 졸업생 기준 이상입니다.`
            : `${label}이 ${comparison.gap}개 더 필요합니다.`;
}