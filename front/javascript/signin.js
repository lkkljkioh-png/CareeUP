async function checkForm() {

    // 입력값 가져오기
    const userId = document.getElementById("user-id").value.trim();
    const password = document.getElementById("password").value;
    const passwordCheck = document.getElementById("password-check").value;
    const email = document.getElementById("email").value.trim();
    const name = document.getElementById("name").value.trim();
    const membershipType = document.getElementById("membership-type");
    const male = document.getElementById("male");
    const female = document.getElementById("female");

    console.log("checkForm 실행");

    // ===== 입력 검사 =====

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

    // ===== Spring Boot 회원가입 =====

    try {

        console.log("fetch 시작");

        const response = await fetch("http://localhost:8080/api/users/signup", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email: email,
                password: password,
                name: name
            })

        });

        console.log("응답 받음");
        console.log(response);

        let result = null;

        const text = await response.text();

        if (text) {
            result = JSON.parse(text);
        }

        console.log("응답 데이터", result);

        if (result.success) {

            alert(result.message);

            window.location.href = "../html/login.html";

        } else {

            alert(result.message);

        }

    } catch (e) {
        console.error(e);
        console.error(e.message);
        alert("서버와 연결할 수 없습니다.");
    }

    return false;
}