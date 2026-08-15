const API = "http://localhost:8080/api/users";

window.addEventListener("DOMContentLoaded", () => {

    // 처음 들어왔을 때 졸업생 전체 조회
    loadGraduates();

    // 검색창에서 Enter 눌러도 검색
    const searchInput = document.getElementById("search-input");

    searchInput.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {
            searchProfiles();
        }

    });
});


// 졸업생 조회
async function loadGraduates(keyword = "") {

    const token = localStorage.getItem("token");

    try {

        let url = `${API}/graduates`;

        // 검색어가 있을 경우 query parameter 추가
        if (keyword) {
            url += `?keyword=${encodeURIComponent(keyword)}`;
        }

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const result = await response.json();

        console.log("졸업생 조회 결과:", result);

        if (result.success) {

            renderProfiles(result.data);

        } else {

            alert(result.message);

        }

    } catch (error) {

        console.error("졸업생 조회 오류:", error);

    }
}


// 검색 버튼
function searchProfiles() {

    const keyword = document
        .getElementById("search-input")
        .value
        .trim();

    loadGraduates(keyword);
}


// 화면에 카드 출력
function renderProfiles(profiles) {

    const profileList =
        document.getElementById("profile-list");

    const template =
        document.getElementById("profile-template");

    // 기존 카드 제거
    profileList.innerHTML = "";


    // 결과 없음
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


        // 이름
        clone.querySelector(".name").textContent =
            profile.name ?? "";


        // 회사 + 직무
        let companyText = profile.company ?? "회사 미등록";

        if (profile.position) {
            companyText += ` · ${profile.position}`;
        }

        clone.querySelector(".company").textContent =
            companyText;


        // 학교
        clone.querySelector(".university").textContent =
            profile.school ?? "학교 미등록";


        // 학과
        clone.querySelector(".major").textContent =
            profile.department ?? "학과 미등록";


        // 졸업년도
        clone.querySelector(".graduationYear").textContent =
            profile.graduationYear
                ? `${profile.graduationYear} 졸업`
                : "졸업년도 미등록";


        // 자세히 보기 버튼
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