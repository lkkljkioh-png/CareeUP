function saveMessage() {

    const text = message.value.trim();

    if (text === "") {
        alert("한마디를 입력해주세요.");
        return;
    }

    localStorage.setItem("graduateMessage", text);

    alert("한마디가 저장되었습니다.");

    const loginUser = JSON.parse(localStorage.getItem("loginUser"));

    if (!loginUser) {
        location.href = "../html/login.html";
        return;
    }

    if (loginUser.membershipType === "재학생") {
        location.href = "../html/studentProfile.html";
    } else {
        location.href = "../html/graduateProfile.html";
    }

}