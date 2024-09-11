let username = "jacob";
let password = "bello";

document.querySelector(".button").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent form submission
    proceed();
});

function hello() {
    if (document.querySelector("#username").value === username) {
        alert("Hi Jacob");
    }
}

function proceed() {
    const enteredUsername = document.querySelector("#username").value;
    const enteredPassword = document.querySelector("#password").value;

    if (enteredUsername === username && enteredPassword === password) {
        window.location.href = "dog.html"; // Correct way to change location
    } else {
        alert("Incorrect credentials");
    }
}