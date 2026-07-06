function checkLogin() {

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

    // 회원 목록 가져오기
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // 아이디와 비밀번호가 일치하는 회원 찾기
    const user = users.find(u =>
        u.userId === userId &&
        u.password === password
    );

    if (!user) {
        alert("아이디 또는 비밀번호가 올바르지 않습니다.");
        return false;
    }

    // 로그인한 회원 저장
    localStorage.setItem(
        "loginUser",
        JSON.stringify(user)
    );

    alert(user.name + "님, 환영합니다!");

    // 메인 페이지 이동
    location.href = "../html/main.html";

    return false;
}