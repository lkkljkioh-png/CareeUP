function saveExperience() {

    const experienceName =
        document.getElementById("experience-name").value.trim();

    if (!experienceName) {
        alert("경력을 입력해주세요.");
        return;
    }

    console.log("입력한 경력:", experienceName);

    alert("경력이 입력되었습니다.");

    history.back();
}