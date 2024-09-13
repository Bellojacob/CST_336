//Event listener
document.querySelector("#myButton").addEventListener("click", checkNum);

let currentGuessCount = 1;
let playerWins = 0;
let playerLosses = 0;

function checkNum(){
    console.log("Checking the number");
    document.querySelector("#resetButton").style.display = "none";
    let userGuess = document.querySelector("#input").value;
    //alert("You entered: " + userGuess);

    document.querySelector("#previousGuesses").innerText += " " + userGuess;
    document.querySelector("#winslosses").innerText = "Wins: " + playerWins + " Losses: " + playerLosses;

    if(currentGuessCount <= 7){ 
        console.log(currentGuessCount);
    if(userGuess == randomNum){
        document.querySelector("#feedback").innerText = "Correct";
        document.querySelector("#feedback").style.color = "green";
        playerWins++;
        return;
    } else if(userGuess > randomNum){
        document.querySelector("#feedback").innerText = "Too High";
        document.querySelector("#feedback").style.color = "red";
        currentGuessCount++;
    } else if(userGuess < randomNum){
        document.querySelector("#feedback").innerText = "Too Low";
        document.querySelector("#feedback").style.color = "red";
        currentGuessCount++;
    } else {
        
        document.querySelector("#feedback").innerText = "Invalid input";
        document.querySelector("#feedback").style.color = "red";
    }
} else {
    document.querySelector("#feedback").innerText = "Game Over";
    document.querySelector("#correctAnswer").innerText = "Correct Answer: " + randomNum;
    document.querySelector("#feedback").style.color = "black";
    playerLosses++;
    
    document.querySelector("#resetButton").style.display = "block";
    currentGuessCount = 0;  
    userGuess = "";
    document.querySelector("#previousGuesses").innerText = " " + userGuess;

    
}
}



// random number
let randomNum = (Math.random() * 99) + 1;
randomNum = Math.floor(randomNum);
console.log(randomNum);

