// Variables
let cardNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, "J", "Q", "K", "A"];
let randomCardArray = [];
let hitBtn = document.querySelector("#hit");
let standBtn = document.querySelector("#stand");
let resetBtn = document.querySelector("#reset");
let counter = 3;
let cpuCounter = 3;
let userTotal = 0;
let numericalUserTotal = 0;
let numericalCpuTotal = 0;

// Function calls
generateCards();
assignCards();
displayUserScore();

// Event listeners
hitBtn.addEventListener("click", newCard);
standBtn.addEventListener("click", cpuTurn);
resetBtn.addEventListener("click", resetGame); // Reset button functionality

// Generate the card deck
function generateCards() {
    randomCardArray = []; // Clear the deck before generating new cards
    for (let i = 0; i < 25; i++) {
        let randomCard;
        do {
            randomCard = cardNumbers[Math.floor(Math.random() * cardNumbers.length)];
        } while (randomCardArray.filter(card => card === randomCard).length >= 4);
        randomCardArray.push(randomCard);
    }
    console.log("Generating Cards...");
    console.log(randomCardArray);
    return randomCardArray;
}

// Get a random card from the deck
function getCard() {
    let card = randomCardArray[Math.floor(Math.random() * randomCardArray.length)];
    return card;
}

// Assign initial cards to CPU and User
function assignCards() {
    let cpuCard1 = document.querySelector("#cpuCard1").innerText = getCard();
    let cpuCard2 = document.querySelector("#cpuCard2").innerText = getCard();

    let userCard1 = document.querySelector("#userCard1").innerText = getCard();
    let userCard2 = document.querySelector("#userCard2").innerText = getCard();

    // Add the scores
    addScore(userCard1);
    addScore(userCard2);

    console.log(`Cpu assigned ${cpuCard1} and ${cpuCard2}. User assigned ${userCard1} and ${userCard2}`);
}

// Draw a new card for the user
function newCard() {
    let currentIteration = `#userCard${counter}`;
    let cardElement = document.querySelector(currentIteration);
    let newUserCard = cardElement.innerText = getCard();
    console.log(`new card value = ${newUserCard}`);
    cardElement.style.display = "block";
    counter++;
    addScore(newUserCard);
    displayUserScore();
}

// Display the user score
function displayUserScore() {
    document.querySelector(".userTotal").innerText = "User Total: " + numericalUserTotal;
}

// Add the score for the user
function addScore(card) {
    if (card == "K" || card == "Q" || card == "J") {
        numericalUserTotal = numericalUserTotal + 10;
    } else if (card == "A") {
        if (numericalUserTotal + 11 > 21) {
            numericalUserTotal = numericalUserTotal + 1;
        } else {
            numericalUserTotal = numericalUserTotal + 11;
        }
    } else {
        numericalUserTotal = numericalUserTotal + Number(card);
    }

    if (numericalUserTotal > 21) {
        document.querySelector(".bust").innerText = "User Bust!";
        hitBtn.style.display = "none"; // Hide hit button if user busts
        standBtn.style.display = "none"; // Hide stand button if user busts
        resetBtn.style.display = "block"; // Show reset button
    }

    return numericalUserTotal;
}

// CPU functionality

// Display the CPU score
function displayCpuScore() {
    document.querySelector(".cpuTotal").innerText = "CPU Total: " + numericalCpuTotal;
}

// Draw a new card for the CPU
function newCpuCard() {
    let currentIteration = `#cpuCard${cpuCounter}`;
    let cardElement = document.querySelector(currentIteration);
    let newCpuCard = cardElement.innerText = getCard();
    console.log(`new CPU card value = ${newCpuCard}`);
    cardElement.style.display = "block";
    cpuCounter++;
    addCpuScore(newCpuCard);
    displayCpuScore();
}

// Add the score for the CPU
function addCpuScore(cpuCard) {
    if (cpuCard == "K" || cpuCard == "Q" || cpuCard == "J") {
        numericalCpuTotal = numericalCpuTotal + 10;
    } else if (cpuCard == "A") {
        if (numericalCpuTotal + 11 > 21) {
            numericalCpuTotal = numericalCpuTotal + 1;
        } else {
            numericalCpuTotal = numericalCpuTotal + 11;
        }
    } else {
        numericalCpuTotal = numericalCpuTotal + Number(cpuCard);
    }

    if (numericalCpuTotal > 21) {
        document.querySelector(".bust").innerText = "CPU Bust!";
        standBtn.style.display = "none"; // Hide stand button if CPU busts
        resetBtn.style.display = "block"; // Show reset button
    }

    return numericalCpuTotal;
}

// CPU's turn to play
function cpuTurn() {
    console.log("Computer Playing...");

    while (numericalCpuTotal < numericalUserTotal && numericalCpuTotal < 21) {
        newCpuCard();
    }

    if (numericalCpuTotal > 21) {
        console.log("CPU busts!");
    } else if (numericalCpuTotal == numericalUserTotal) {
        console.log("CPU ties!");
    } else {
        console.log("CPU Wins!");
    }

    hitBtn.style.display = "none";
    standBtn.style.display = "none";
    resetBtn.style.display = "block";
}

// Reset the game state
function resetGame() {
    console.log("Resetting Game...");

    // Reset all relevant variables
    numericalUserTotal = 0;
    numericalCpuTotal = 0;
    counter = 3;
    cpuCounter = 3;

    // Clear the card displays
    for (let i = 1; i <= 5; i++) {
        document.querySelector(`#userCard${i}`).innerText = "";
        document.querySelector(`#userCard${i}`).style.display = "none";
        document.querySelector(`#cpuCard${i}`).innerText = "";
        document.querySelector(`#cpuCard${i}`).style.display = "none";
    }

    // Clear score display and bust messages
    document.querySelector(".userTotal").innerText = "User Total: 0";
    document.querySelector(".cpuTotal").innerText = "CPU Total: 0";
    document.querySelector(".bust").innerText = "";

    // Show the hit and stand buttons, hide the reset button
    hitBtn.style.display = "block";
    standBtn.style.display = "block";
    resetBtn.style.display = "none";

    // Regenerate the card deck and reassign initial cards
    generateCards();
    assignCards();
}
