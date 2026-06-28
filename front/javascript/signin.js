function checkForm() {
    
    // 입력값 가져오기
    const userId = document.getElementById("userId").value.trim();
    const password = document.getElementById("password").value;
    const passwordCheck = document.getElementById("passwordCheck").value;
    const email = document.getElementById("email").value.trim();
    const name = document.getElementById("name").value.trim();
    const membershipType = document.getElementById("membershipType");
    const male = document.getElementById("male");
    const female = document.getElementById("female");

    // 빈칸 검사
    if (userId === "" || password === "" || passwordCheck === "" || email === "" || name === "") {
        alert("모든 항목을 입력해주세요.");
        return false;
    }

    // 아이디 길이 검사
    if (userId.length < 4) {
        alert("아이디는 4자 이상 입력해주세요.");
        return false;
    }

    // 비밀번호 조건 검사 (8자 이상, 영문과 숫자 포함)

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(password)) {
        alert("비밀번호는 8자 이상이며 영문과 숫자를 모두 포함해야 합니다.");
        return false;
    }

    // 비밀번호 확인
    if (password !== passwordCheck) {
        alert("비밀번호가 일치하지 않습니다.");
        return false;
    }

    // 이메일 형식 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        alert("올바른 이메일 형식을 입력해주세요.");
        return false;
    }

    if (membershipType.value === "선택하세요") {
        alert("회원 유형을 선택해주세요.");
        return false;
    }

    if (male.checked === false && female.checked === false) {
        alert("성별을 선택해주세요.");
        return false;
    }

    // 모든 검사 통과
    alert("회원가입이 완료되었습니다.");
    
    return true;
}