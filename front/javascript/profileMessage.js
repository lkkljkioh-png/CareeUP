window.onload = function () {

    fetch("http://localhost:8080/api/users/me", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
    .then(response => response.json())
    .then(result => {

        console.log(result);

        if (result.success) {

            document.getElementById("graduate-name").textContent =
                result.data.name ?? "";

            document.getElementById("graduate-message").textContent =
                result.data.message ?? "";

        } else {
            alert(result.message);
        }

    })
    .catch(error => {
        console.error(error);
    });

};