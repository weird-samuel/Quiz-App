const userInfoForm = document.getElementById("user-info-form");
const startBtn = document.getElementById("start-btn");

let userName = "";
let userEmail = "";

function validateForm(event) {
    event.preventDefault();

    userName = document.getElementById("name").value;
    userEmail = document.getElementById("email").value;

    if (userName === "" || userEmail === "") {
        alert("Please enter your name and email address.");
    } else {
        localStorage.setItem("userName", userName);
        localStorage.setItem("userEmail", userEmail);
        window.open("./main./start.html", "_parent");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    startBtn.addEventListener("click", validateForm);
});
