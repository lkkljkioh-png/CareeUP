const PROFILE_API = "http://localhost:8080/api/student-profile";

async function saveProject() {

    const projectName =
        document.getElementById("project-name").value.trim();

    if (!projectName) {
        alert("프로젝트 이름을 입력해주세요.");
        return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
        alert("로그인이 필요합니다.");
        location.href = "login.html";
        return;
    }

    try {

        const response = await fetch(
            PROFILE_API + "/projects",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },

                body: JSON.stringify({
                    projectName: projectName
                })
            }
        );

        const result = await response.json();

        if (result.success) {

            alert("프로젝트가 추가되었습니다.");

            location.href = "studentProfile.html";

        } else {

            alert(result.message);

        }

    } catch (error) {

        console.error(error);
        alert("프로젝트 추가 중 오류가 발생했습니다.");

    }
}