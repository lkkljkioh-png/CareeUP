async function checkLogin() {

    const userId = document.getElementById("user-id").value.trim();
    const password = document.getElementById("password").value;

    // 빈칸 검사
    if (userId === "" && password === "") {
        alert("아이디와 비밀번호를 입력해주세요.");
        return false;
    }

    if (userId === "") {
        alert("아이디를 입력해주세요.");
        return false;
    }

    if (password === "") {
        alert("비밀번호를 입력해주세요.");
        return false;
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

        const result = await response.json();

        if (response.ok && result.success) {

            // JWT 저장
            localStorage.setItem("token", result.data.token);

            // 사용자 정보 저장(필요하면)
            localStorage.setItem("userId", userId);
            localStorage.setItem("name", result.data.name);
            localStorage.setItem("email", result.data.email);

            // 회원 유형 저장
            localStorage.setItem("membershipType", result.data.membershipType);

            alert("로그인 성공!");

            window.location.href = "../html/main.html";

        } else {
            alert(result.message);
        }

    } catch (e) {
        console.error(e);
        alert("서버에 연결할 수 없습니다.");
    }

    return false;
}