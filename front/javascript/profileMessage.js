window.addEventListener("DOMContentLoaded", loadProfileMessage);

function loadProfileMessage() {

    const token = localStorage.getItem("token");

    if (!token) {
        return;
    }

    fetch("http://localhost:8080/api/users/me", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })
        .then(response => response.json())
        .then(result => {

            console.log("profileMessage 응답:", result);

            if (!result.success) {
                alert(result.message);
                return;
            }

            const user = result.data;

            // 졸업생
            const graduateName =
                document.getElementById("graduate-name");

            const graduateMessage =
                document.getElementById("graduate-message");

            if (graduateName) {
                graduateName.textContent = user.name ?? "";
            }

            if (graduateMessage) {
                graduateMessage.textContent =
                    user.message || "등록된 한마디가 없습니다.";
            }

            // 재학생
            const studentName =
                document.getElementById("student-name");

            const studentMessage =
                document.getElementById("student-message");

            if (studentName) {
                studentName.textContent = user.name ?? "";
            }

            if (studentMessage) {
                studentMessage.textContent =
                    user.message || "등록된 한마디가 없습니다.";
            }

        })
        .catch(error => {
            console.error("profileMessage 오류:", error);
        });
}