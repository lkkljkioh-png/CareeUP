console.log("recentGraduates.js 실행됨");

const RECENT_GRADUATES_KEY = "recentGraduates";

window.addEventListener("DOMContentLoaded", () => {
    loadRecentGraduates();
});

// 최근 본 졸업생 조회
function loadRecentGraduates() {

    const list =
        document.getElementById("recent-graduate-list");

    const empty =
        document.getElementById("recent-empty");

    const count =
        document.getElementById("recent-count");

    if (!list || !empty || !count) {
        console.error("최근 본 졸업생 화면 요소를 찾을 수 없습니다.");
        return;
    }

    const recentGraduates =
        getRecentGraduates();

    count.textContent =
        recentGraduates.length;

    list.replaceChildren();

    if (recentGraduates.length === 0) {
        list.style.display = "none";
        empty.style.display = "flex";
        return;
    }

    list.style.display = "flex";
    empty.style.display = "none";

    recentGraduates.forEach(graduate => {
        renderGraduateCard(
            graduate,
            list
        );
    });
}

// localStorage에서 최근 본 졸업생 가져오기
function getRecentGraduates() {

    try {

        const saved =
            localStorage.getItem(
                RECENT_GRADUATES_KEY
            );

        if (!saved) {
            return [];
        }

        const recentGraduates =
            JSON.parse(saved);

        if (!Array.isArray(recentGraduates)) {
            return [];
        }

        return recentGraduates;

    } catch (error) {

        console.error(
            "최근 본 졸업생 데이터 읽기 실패:",
            error
        );

        return [];
    }
}

// 졸업생 카드 출력
function renderGraduateCard(
    graduate,
    container
) {

    const template =
        document.getElementById(
            "graduate-card-template"
        );

    if (!template) {
        console.error("graduate-card-template을 찾을 수 없습니다.");
        return;
    }

    const cardFragment =
        template.content.cloneNode(true);

    const card =
        cardFragment.querySelector(
            ".graduate-card"
        );

    const avatar =
        card.querySelector(
            ".graduate-avatar"
        );

    const name =
        card.querySelector(
            ".graduate-name"
        );

    const job =
        card.querySelector(
            ".graduate-job"
        );

    const school =
        card.querySelector(
            ".graduate-school"
        );

    const department =
        card.querySelector(
            ".graduate-department"
        );

    const year =
        card.querySelector(
            ".graduate-year"
        );

    const detailButton =
        card.querySelector(
            ".detail-button"
        );

    const removeButton =
        card.querySelector(
            ".remove-button"
        );

    avatar.textContent =
        getInitial(
            graduate.name
        );

    name.textContent =
        graduate.name
        || "이름 미등록";

    job.textContent =
        getGraduateJobText(
            graduate
        );

    school.textContent =
        graduate.school
        || "학교 미등록";

    department.textContent =
        graduate.department
        || "학과 미등록";

    year.textContent =
        graduate.graduationYear
            ? `${graduate.graduationYear} 졸업`
            : "졸업년도 미등록";

    detailButton.addEventListener(
        "click",
        () => {

            location.href =
                `graduateDetail.html?id=${graduate.id}`;

        }
    );

    removeButton.addEventListener(
        "click",
        () => {

            removeRecentGraduate(
                graduate.id
            );

        }
    );

    container.appendChild(
        cardFragment
    );
}

// 회사 및 직무 출력
function getGraduateJobText(graduate) {

    return [
        graduate.company,
        graduate.position
    ]
        .filter(Boolean)
        .join(" · ")
        || "회사 및 직무 미등록";
}

// 최근 본 졸업생 삭제
function removeRecentGraduate(
    graduateId
) {

    const recentGraduates =
        getRecentGraduates();

    const updatedGraduates =
        recentGraduates.filter(
            graduate =>
                Number(graduate.id)
                !== Number(graduateId)
        );

    localStorage.setItem(
        RECENT_GRADUATES_KEY,
        JSON.stringify(
            updatedGraduates
        )
    );

    loadRecentGraduates();
}

// 이름 첫 글자 출력
function getInitial(name) {

    if (!name) {
        return "?";
    }

    return name
        .trim()
        .charAt(0);
}