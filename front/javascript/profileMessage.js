// 한마디 불러오기 (DB 연결 후 localStorage 대신 DB에서 불러오도록 변경 필요)
window.onload = function () {

    const savedMessage = localStorage.getItem("graduateMessage");

    if (savedMessage) {
        document.getElementById("graduate-message").innerText = savedMessage;
    }

};