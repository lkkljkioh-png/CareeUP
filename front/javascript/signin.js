function checkForm() {

    // 입력값 가져오기
    const userId = document.getElementById("user-id").value.trim();
    const password = document.getElementById("password").value;
    const passwordCheck = document.getElementById("password-check").value;
    const email = document.getElementById("email").value.trim();
    const name = document.getElementById("name").value.trim();
    const membershipType = document.getElementById("membership-type");
    const male = document.getElementById("male");
    const female = document.getElementById("female");

    // -------- 기존 검사 코드 그대로 --------

    if (userId === "" || password === "" || passwordCheck === "" || email === "" || name === "") {
        alert("모든 항목을 입력해주세요.");
        return false;
    }

    if (userId.length < 4) {
        alert("아이디는 4자 이상 입력해주세요.");
        return false;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(password)) {
        alert("비밀번호는 8자 이상이며 영문과 숫자를 모두 포함해야 합니다.");
        return false;
    }

    if (password !== passwordCheck) {
        alert("비밀번호가 일치하지 않습니다.");
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        alert("올바른 이메일 형식을 입력해주세요.");
        return false;
    }

    if (membershipType.value === "선택하세요") {
        alert("회원 유형을 선택해주세요.");
        return false;
    }

    if (!male.checked && !female.checked) {
        alert("성별을 선택해주세요.");
        return false;
    }

    // 회원 정보 저장
    const users =
        JSON.parse(localStorage.getItem("users")) || [];

    users.push({

        userId,
        password,
        email,
        name,
        membershipType: membershipType.value,
        gender: male.checked ? "남" : "여"

    });

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    alert("회원가입이 완료되었습니다.");

    return true;
}