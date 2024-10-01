document.querySelector("#btnPress").addEventListener("click", showScore);

function showScore() {
    let input = document.querySelector("#btn").value;
    console.log(input);

    if (input >= 90) {
        document.querySelector("#output").innerText = "A";
        document.querySelector("#output").style.color = "green";
    } else if (input >= 80) {
        document.querySelector("#output").innerText = "B";
    } else if (input >= 70) {
        document.querySelector("#output").innerText = "C";
    }
    else if (input >= 60) {
        document.querySelector("#output").innerText = "D";
    }
    else if (input < 60) {
        document.querySelector("#output").innerText = "F";
    }
}