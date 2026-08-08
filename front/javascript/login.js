document
    .getElementById("login-form")
    .addEventListener("submit", checkLogin);

async function checkLogin(event) {

    // 폼 새로고침 막기
    event.preventDefault();

    console.log("checkLogin 실행");

    const userId = document.getElementById("user-id").value.trim();
    const password = document.getElementById("password").value;

    // 빈칸 검사
    if (userId === "" && password === "") {
        alert("아이디와 비밀번호를 입력해주세요.");
        return;
    }

    if (userId === "") {
        alert("아이디를 입력해주세요.");
        return;
    }

    if (password === "") {
        alert("비밀번호를 입력해주세요.");
        return;
    }

    try {

        const response = await fetch(
            `${API_BASE_URL}/api/users/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: userId,
                    password: password
                })
            }
        );

        console.log("Status:", response.status);

        const result = await response.json();

        console.log("Response:", result);

        if (response.ok && result.success) {

            // JWT 저장
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("userId", userId);
            localStorage.setItem("name", result.data.name);
            localStorage.setItem("email", result.data.email);
            localStorage.setItem("membershipType", result.data.membershipType);

            alert("로그인 성공!");

            window.location.href = "main.html";

        } else {

            alert(result.message);

        }

    } catch (e) {

        console.error(e);
        alert("서버에 연결할 수 없습니다.");

    }

}