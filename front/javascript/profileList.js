const API = "http://localhost:8080/api/users";

let selectedMajorCategory = "";

window.addEventListener("DOMContentLoaded", () => {

    loadGraduates();

    const searchInput =
        document.getElementById("search-input");

    searchInput.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {
            searchProfiles();
        }
    });
});

// 졸업생 조회
async function loadGraduates(
    keyword = "",
    majorCategory = selectedMajorCategory
) {

    const token = localStorage.getItem("token");

    try {

        const params = new URLSearchParams();

        if (keyword) {
            params.append("keyword", keyword);
        }

        if (majorCategory) {
            params.append("majorCategory", majorCategory);
        }

        let url = `${API}/graduates`;

        if (params.toString()) {
            url += `?${params.toString()}`;
        }

        console.log("졸업생 조회 URL:", url);

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const result = await response.json();

        console.log("졸업생 조회 결과:", result);

        if (!response.ok) {
            alert(result.message || "졸업생 조회에 실패했습니다.");
            return;
        }

        if (result.success) {
            renderProfiles(result.data);
        } else {
            alert(result.message);
        }

    } catch (error) {

        console.error("졸업생 조회 오류:", error);
        alert("서버에 연결할 수 없습니다.");
    }
}

// 검색 버튼
function searchProfiles() {

    const keyword =
        document.getElementById("search-input")
            .value
            .trim();

    loadGraduates(keyword, selectedMajorCategory);
}

// 계열 필터 선택
function selectMajorCategory(button) {

    selectedMajorCategory =
        button.dataset.category;

    document.querySelectorAll(".category-btn")
        .forEach(categoryButton => {
            categoryButton.classList.remove("active");
        });

    button.classList.add("active");

    searchProfiles();
}

// 화면에 카드 출력
function renderProfiles(profiles) {

    const profileList =
        document.getElementById("profile-list");

    const template =
        document.getElementById("profile-template");

    profileList.innerHTML = "";

    if (!profiles || profiles.length === 0) {

        profileList.innerHTML = `
            <div class="empty-result">
                검색 결과가 없습니다.
            </div>
        `;

        return;
    }

    profiles.forEach(profile => {

        const clone =
            template.content.cloneNode(true);

        clone.querySelector(".name").textContent =
            profile.name ?? "";

        let companyText =
            profile.company ?? "회사 미등록";

        if (profile.position) {
            companyText += ` · ${profile.position}`;
        }

        clone.querySelector(".company").textContent =
            companyText;

        clone.querySelector(".university").textContent =
            profile.school ?? "학교 미등록";

        clone.querySelector(".major-category").textContent =
            profile.majorCategory ?? "계열 미등록";

        clone.querySelector(".major").textContent =
            profile.department ?? "학과 미등록";

        clone.querySelector(".graduationYear").textContent =
            profile.graduationYear
                ? `${profile.graduationYear} 졸업`
                : "졸업년도 미등록";

        const detailButton =
            clone.querySelector(".detail-btn");

        detailButton.addEventListener("click", () => {
            goDetail(profile.id);
        });

        profileList.appendChild(clone);
    });
}

// 상세 프로필 이동
function goDetail(id) {

    console.log("선택한 졸업생 ID:", id);

    location.href = `graduateDetail.html?id=${id}`;
}