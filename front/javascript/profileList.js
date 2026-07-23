const users = JSON.parse(localStorage.getItem("users")) || [];

const graduates = users.filter(user => user.membershipType === "졸업생");

drawProfiles(graduates);

// 카드 출력 함수
function drawProfiles(graduates){

    const list = document.getElementById("profile-list");
    const template = document.getElementById("profile-template");

    list.innerHTML = "";

    graduates.forEach((graduate,index)=>{

        const card = template.content.cloneNode(true);

        card.querySelector(".name").innerText = graduate.name;
        card.querySelector(".company").innerText = graduate.company || "회사 정보 없음";

        card.querySelector(".university").innerText = graduate.school || "-";
        card.querySelector(".major").innerText = graduate.dept || "-";
        card.querySelector(".graduationYear").innerText = graduate.year || "-";

        card.querySelector(".detail-btn").onclick = function(){
            goDetail(index);
        };

        list.appendChild(card);

    });

}

// 검색 버튼
function searchProfiles(){

    const keyword = document.getElementById("search-input").value.toLowerCase();

    const school = document.getElementById("school-filter").value;

    const dept = document.getElementById("dept-filter").value;

    const result = graduates.filter(g=>{

        return (
            (g.name.toLowerCase().includes(keyword) ||
            (g.company||"").toLowerCase().includes(keyword))
            &&
            (school==="" || g.school===school)
            &&
            (dept==="" || g.dept===dept)
        );

    });

    drawProfiles(result);

}

// 프로필 카드 클릭 시 상세 페이지로 이동
function goDetail(index){

    localStorage.setItem(
        "selectedGraduate",
        JSON.stringify(graduates[index])
    );

    location.href="graduateProfile.html";

}
