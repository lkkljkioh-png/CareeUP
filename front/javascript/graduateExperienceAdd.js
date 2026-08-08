const PROFILE_API = "http://localhost:8080/api/graduate-profile";

async function saveExperience() {

    const experienceName =
        document.getElementById("experience-name").value.trim();

    if (!experienceName) {
        alert("경력을 입력해주세요.");
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
            PROFILE_API + "/experiences",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },

                body: JSON.stringify({
                    experienceName: experienceName
                })
            }
        );

        const result = await response.json();

        if (result.success) {

            alert("경력이 추가되었습니다.");
            location.href = "graduateProfile.html";

        } else {

            alert(result.message);

        }

    } catch (error) {

        console.error(error);
        alert("경력 추가 중 오류가 발생했습니다.");

    }
}