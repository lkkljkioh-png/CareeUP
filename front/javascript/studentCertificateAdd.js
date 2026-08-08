function saveCertificate() {

    const certificateName =
        document.getElementById("certificate-name").value.trim();

    if (!certificateName) {
        alert("자격증 이름을 입력해주세요.");
        return;
    }

    console.log("입력한 자격증:", certificateName);

    alert("자격증이 입력되었습니다.");

    history.back();
}