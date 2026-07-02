function goMyPage() {
    const role = localStorage.getItem("role");

    if (role === "student") {
        location.href = "../html/studentMy.html";
    } else {
        location.href = "../html/graduateMy.html";
    }
}

function goProfile() {
    const role = localStorage.getItem("role");

    if (role === "student") {
        location.href = "../html/studentProfile.html";
    } else {
        location.href = "../html/graduateProfile.html";
    }
}