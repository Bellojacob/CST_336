// alert("running external JS code!")

document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initGame);

document.querySelector("#playerGuess").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        checkGuess(); // Call checkGuess when Enter is pressed
    }
});

let randomNumber;
let attempts = 0;
let attemptsLeft = 7;
let wins = 0;
let losses = 0;

initGame();

function initGame(){
    attempts = 0;
    attemptsLeft = 7;
    randomNumber = Math.floor(Math.random()* 99 ) + 1;
    console.log("Random number = " + randomNumber);

    document.querySelector("#resetBtn").style.display = "none";
    document.querySelector("#guessBtn").style.display = "inline"

    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.focus();
    playerGuess.value = ""

    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";

    let correctAnswer = document.querySelector("#correctAnswer");
    correctAnswer.textContent = "";

    document.querySelector("#guesses").textContent = "";
    document.querySelector("#attemptsLeft").textContent = attemptsLeft;
    document.querySelector("#winsDisplay").textContent = wins;
    document.querySelector("#lossesDisplay").textContent = losses;
}

function checkGuess(){
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    document.querySelector("#attemptsLeft").textContent = (attemptsLeft - 1) - attempts;
    
    let guess = document.querySelector("#playerGuess").value;
    console.log("Player guess = "+ guess);
    if (guess < 1 || guess > 99){
        feedback.textContent = "Enter a number 1 - 99";
        feedback.style.color = "red";
        return;
    }

    attempts++;
    console.log("Attempts:" + attempts);
    feedback.style.color = "purple";

    if (guess == randomNumber){
        feedback.textContent = "That's right!! You Win!";
        feedback.style.color = "green";
        wins++;
        document.querySelector("#winsDisplay").textContent = wins;
        
        gameOver();

    } else {
        document.querySelector("#guesses").textContent += guess + " ";
        if (attempts == 7){
            feedback.textContent = "You lose";
            let correctAnswer = document.querySelector("#correctAnswer");
            correctAnswer.textContent = "The Correct answer was " + randomNumber;
            correctAnswer.style.color = "red";
            feedback.style.color = "red";
            losses++;
            document.querySelector("#lossesDisplay").textContent = losses;

            gameOver();
        } else if (guess > randomNumber) {
            feedback.textContent = "Guess too high";
            feedback.style.color = "red";
        } else {
            feedback.textContent = "Guess too low";
            feedback.style.color = "red";
        }
    }
    // clear guess after user presses guess
    playerGuess.value= ""
}

function gameOver(){
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none";
    resetBtn.style.display = "inline";
}