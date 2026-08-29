console.log("studentMy.js 실행됨");

const API = "http://localhost:8080/api/users";
const PROFILE_API = "http://localhost:8080/api/student-profile";
const BOOKMARK_API = "http://localhost:8080/api/bookmarks/graduates";

window.addEventListener("DOMContentLoaded", () => {
    loadMyInfo();
    loadActivityCounts();
    loadFavoriteGraduates();
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

// 관심 졸업생 목록 조회
async function loadFavoriteGraduates() {

    const token =
        localStorage.getItem("token");

    if (!token) {
        return;
    }

    try {

        const response =
            await fetch(
                BOOKMARK_API,
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
                || "관심 졸업생 조회 실패"
            );
        }

        renderFavoriteGraduates(
            result.data || []
        );

    } catch (error) {

        console.error(
            "관심 졸업생 조회 오류:",
            error
        );
    }
}

// 관심 졸업생 목록 출력
function renderFavoriteGraduates(
    graduates
) {

    const container =
        document.getElementById(
            "favorite-graduate-list"
        );

    const count =
        document.getElementById(
            "favorite-graduate-count"
        );

    if (!container || !count) {
        return;
    }

    count.textContent =
        graduates.length;

    container.innerHTML = "";

    if (graduates.length === 0) {

        container.innerHTML = `
            <p class="favorite-empty">
                관심 등록한 졸업생이 없습니다.
            </p>
        `;

        return;
    }

    graduates.forEach(graduate => {

        const item =
            document.createElement("div");

        item.className =
            "favorite-graduate-item";

        const info =
            document.createElement("div");

        info.className =
            "favorite-graduate-info";

        const name =
            document.createElement("strong");

        name.textContent =
            graduate.name
            || "이름 미등록";

        const job =
            document.createElement("p");

        job.textContent =
            getGraduateJobText(graduate);

        const school =
            document.createElement("span");

        school.textContent =
            [
                graduate.school,
                graduate.department
            ]
                .filter(Boolean)
                .join(" · ")
            || "학교 정보 미등록";

        info.append(
            name,
            job,
            school
        );

        const actions =
            document.createElement("div");

        actions.className =
            "favorite-actions";

        const detailButton =
            document.createElement("button");

        detailButton.type = "button";

        detailButton.className =
            "favorite-detail-btn";

        detailButton.textContent =
            "프로필 보기";

        detailButton.addEventListener(
            "click",
            () => {
                location.href =
                    `graduateDetail.html?id=${graduate.id}`;
            }
        );

        const removeButton =
            document.createElement("button");

        removeButton.type = "button";

        removeButton.className =
            "favorite-remove-btn";

        removeButton.textContent = "해제";

        removeButton.addEventListener(
            "click",
            () => {
                removeFavoriteGraduate(
                    graduate.id,
                    removeButton
                );
            }
        );

        actions.append(
            detailButton,
            removeButton
        );

        item.append(
            info,
            actions
        );

        container.appendChild(item);
    });
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

// MY 페이지에서 관심 졸업생 해제
async function removeFavoriteGraduate(
    graduateId,
    button
) {

    const token =
        localStorage.getItem("token");

    button.disabled = true;

    try {

        const response = await fetch(
            `${BOOKMARK_API}/${graduateId}`,
            {
                method: "DELETE",
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
                || "관심 등록 해제 실패"
            );
        }

        await loadFavoriteGraduates();

    } catch (error) {

        console.error(
            "관심 졸업생 해제 오류:",
            error
        );

        alert(error.message);

        button.disabled = false;
    }
}