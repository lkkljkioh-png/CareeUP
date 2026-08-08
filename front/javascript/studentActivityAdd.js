function saveActivity() {

    const activityName =
        document.getElementById("activity-name").value.trim();

    if (!activityName) {
        alert("대외활동 이름을 입력해주세요.");
        return;
    }

    console.log("입력한 대외활동:", activityName);

    alert("대외활동이 입력되었습니다.");

    history.back();
}