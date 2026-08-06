window.onload = function () {

    const savedMessage = localStorage.getItem("graduateMessage");

    if (result.success) {

        document.getElementById("graduate-name").textContent =
            result.data.name;

        document.getElementById("graduate-message").textContent =
            result.data.message ?? "";

    } else {

        alert(result.message);

    }

};