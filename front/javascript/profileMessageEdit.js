async function saveMessage() {

    console.log("저장 버튼 클릭");
    const text = message.value.trim();

    if (text === "") {
        alert("한마디를 입력해주세요.");
        return;
    }

    try {

        console.log("fetch 시작");
        console.log(API_BASE_URL);
        console.log(localStorage.getItem("token"));

        const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                message: text
            })
        });

        const result = await response.json();

        if (response.ok && result.success) {

            alert("한마디가 저장되었습니다.");

            goProfile();

        } else {

            alert(result.message);

        }

    } catch (e) {

        console.error("에러:", e);
        alert(e.message);

    }

}