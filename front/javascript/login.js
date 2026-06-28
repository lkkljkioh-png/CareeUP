function checkLogin() {

    const userId = document.getElementById("userId").value.trim();
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

    alert("로그인 성공!");

    // 로그인 성공 시 메인 페이지로 이동
    location.href = "../html/main.html"; 

    // 모든 검사 통과 (테스트 용이라 일단 return false → 나중에 수정 필요)
    return false;
}