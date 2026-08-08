function saveProject() {

    const projectName =
        document.getElementById("project-name").value.trim();

    if (!projectName) {
        alert("프로젝트 이름을 입력해주세요.");
        return;
    }

    console.log("입력한 프로젝트:", projectName);

    alert("프로젝트가 입력되었습니다.");

    history.back();
}