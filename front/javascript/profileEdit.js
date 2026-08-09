const API = "http://localhost:8080/api/users";

window.addEventListener("DOMContentLoaded", () => {
    loadProfile();
});

async function loadProfile() {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("membershipType");

    if (!token) {
        alert("로그인이 필요합니다.");
        location.href = "login.html";
        return;
    }

    // 재학생 / 졸업생 입력창 구분
    const studentFields = document.getElementById("student-fields");
    const graduateFields = document.getElementById("graduate-fields");

    if (role === "student") {
        studentFields.style.display = "block";
        graduateFields.style.display = "none";
    } else {
        studentFields.style.display = "none";
        graduateFields.style.display = "block";
    }

    try {

        const response = await fetch(API + "/me", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const result = await response.json();

        if (!response.ok) {
            alert(result.message || "프로필을 불러오지 못했습니다.");
            return;
        }

        const user = result.data;

        document.getElementById("name").value =
            user.name || "";

        document.getElementById("school").value =
            user.school || "";

        document.getElementById("department").value =
            user.department || "";

        document.getElementById("techStack").value =
            user.techStack || "";

        if (role === "student") {

            document.getElementById("grade").value =
                user.grade || "";

            document.getElementById("desiredJob").value =
                user.desiredJob || "";

        } else {

            document.getElementById("graduationYear").value =
                user.graduationYear || "";

            document.getElementById("company").value =
                user.company || "";

            document.getElementById("position").value =
                user.position || "";
        }

    } catch (error) {

        console.error(error);
        alert("서버에 연결할 수 없습니다.");
    }
}


async function saveProfile() {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("membershipType");

    const data = {
        school: document.getElementById("school").value.trim(),
        department: document.getElementById("department").value.trim(),
        techStack: document.getElementById("techStack").value.trim()
    };

    if (role === "student") {

        data.grade =
            document.getElementById("grade").value;

        data.desiredJob =
            document.getElementById("desiredJob").value.trim();

    } else {

        data.graduationYear =
            document.getElementById("graduationYear").value.trim();

        data.company =
            document.getElementById("company").value.trim();

        data.position =
            document.getElementById("position").value.trim();
    }

    console.log("저장 데이터:", data);
    try {

        const response = await fetch(API + "/profile", {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },

            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            alert(result.message || "프로필 수정에 실패했습니다.");
            return;
        }

        alert("프로필이 수정되었습니다.");

        goProfile();

    } catch (error) {

        console.error(error);
        alert("서버에 연결할 수 없습니다.");
    }
}