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

function displayScore(){
    displayCpuScore()
    displayUserScore()
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

    addCpuScore(cpuCard1);
    addCpuScore(cpuCard2);

    console.log(`Cpu assigned ${cpuCard1} and ${cpuCard2}. User assigned ${userCard1} and ${userCard2}`);
    displayScore()
}

// Draw a new card for the user
function newCard() {
    // get current card from the html tag
    let currentIteration = `#userCard${counter}`;
    // get the card element that is current
    let cardElement = document.querySelector(currentIteration);
    // newUserCard equals the Card element, also set that card equal to a new card value
    let newUserCard = cardElement.innerText = getCard();
    // log the card element value
    console.log(`new card value = ${newUserCard}`);
    // display the card element
    cardElement.style.display = "block";
    // increment so if the user presses hitBtn again, we get a new card element
    counter++;
    // add the new card value to the user's total score
    addScore(newUserCard);
    // display the score
    displayUserScore();
}

// Display the user score
function displayUserScore() {
    // display the current score
    document.querySelector(".userTotal").innerText = "User Total: " + numericalUserTotal;
}



// Add the score for the user
function addScore(card) {
    // if the new card passed in is K,Q, or J, then add 10 to the user's score
    if (card == "K" || card == "Q" || card == "J") {
        numericalUserTotal = numericalUserTotal + 10;
    // if the card is A, then check if it should be a 1 or 11, then add that to the user's score
    } else if (card == "A") {
        if (numericalUserTotal + 11 > 21) {
            numericalUserTotal = numericalUserTotal + 1;
        } else {
            numericalUserTotal = numericalUserTotal + 11;
        }
        // if it is not a K,Q,J,or, A, then it has to be a number, so just add that to the score
    } else {
        numericalUserTotal = numericalUserTotal + Number(card);
    }

    // each time a score is added, check if the score is greater than 21,
    // if so then hide the playing buttons, and allow the user to reset the game
    if (numericalUserTotal > 21) {
        document.querySelector(".result").innerText = "User Bust!";
        showResetBtn()
    }

    // return the score to the variable
    return numericalUserTotal;
}

// CPU functionality

// Display the CPU score
function displayCpuScore() {
    // display the cpu score
    document.querySelector(".cpuTotal").innerText = "CPU Total: " + numericalCpuTotal;
}

// Draw a new card for the CPU
function newCpuCard() {
    // from the same deck, draw a card for the cpu
    let cpuCurrentIteration = `#cpuCard${cpuCounter}`;
    let cpuCardElement = document.querySelector(cpuCurrentIteration);
    let newCpuCard = cpuCardElement.innerText = getCard();
    console.log(`new CPU card value = ${newCpuCard}`);
    cpuCardElement.style.display = "block";
    cpuCounter++;
    addCpuScore(newCpuCard);
    displayCpuScore();
}

// Add the score for the CPU
function addCpuScore(cpuCard) {
    // same functionality as for the user, all scores added to numericalCpuTotal
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
        document.querySelector(".result").innerText = "CPU Bust!";
        showResetBtn();
    }

    // return the cpu score to the variable
    return numericalCpuTotal;
}

// CPU's turn to play
// after the user stands, the cpu will take it's turn
function cpuTurn() {
    console.log("Computer Playing...");

    // the cpu will keep drawing cards as long as it is under 21 and less than the user's score
    while (numericalCpuTotal < numericalUserTotal && numericalCpuTotal < 21) {
        newCpuCard();
    }


    // logic for if the cpu is wins,ties, or loses
    if (numericalCpuTotal > 21) {
        console.log("CPU busts!");
        document.querySelector(".result").innerText = "CPU Bust!";
    } else if (numericalCpuTotal == numericalUserTotal) {
        console.log("CPU ties!");
        document.querySelector(".result").innerText = "CPU Ties!";
    } else {
        console.log("CPU Wins!");
        document.querySelector(".result").innerText = "CPU Wins!";
    }

    showResetBtn();
}

// Reset the game state
function resetGame() {
    console.log("Resetting Game...");
    numericalUserTotal = 0;
    numericalCpuTotal = 0;
    document.querySelector(".result").innerText = "";


    removeCards();
    reassignCards();
    counter = 3;
    cpuCounter = 3;
    showPlayBtns()
    generateCards()
    assignCards()
    displayUserScore()
    
}

function showResetBtn(){
    hitBtn.style.display = "none";
    standBtn.style.display = "none";
    resetBtn.style.display = "block";
}

function showPlayBtns(){
    hitBtn.style.display = "block";
    standBtn.style.display = "block";
    resetBtn.style.display = "none";
}

function removeCards(){
    do {
        let currentIteration = `#userCard${counter}`;
        let cardElement = document.querySelector(currentIteration);
        console.log("Removing User Cards...")
        cardElement.style.display = "none";
        counter--;
    } while (counter != 0)

    do {
        let cpuCurrentIteration = `#cpuCard${cpuCounter}`;
        let cpuCardElement = document.querySelector(cpuCurrentIteration);
        console.log("Removing Cpu Cards...")
        cpuCardElement.style.display = "none";
        cpuCounter--;
    } while (counter != 0)
}

function reassignCards(){
    for (let i = 1; i < 3; i++){
        let currentIteration = `#userCard${i}`;
        let cardElement = document.querySelector(currentIteration);
        let newUserCard = cardElement.innerText = getCard();
        cardElement.style.display = "block";
        addScore(newUserCard);
        
    }
}