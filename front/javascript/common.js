function goMyPage() {
    const role = localStorage.getItem("role");

    if (role === "student") {
        location.href = "studentMy.html";
    } else {
        location.href = "graduateMy.html";
    }
}

function goProfile() {
    const role = localStorage.getItem("role");

    if (role === "student") {
        location.href = "studentProfile.html";
    } else {
        location.href = "graduateProfile.html";
    }
}