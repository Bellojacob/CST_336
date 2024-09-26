// Variables
//arrays
let cardNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, "J", "Q", "K", "A"];
let randomCardArray = [];
let userCardsArray = []
let cpuCardsArray = []
//Buttons
let hitBtn = document.querySelector("#hit");
let standBtn = document.querySelector("#stand");
let resetBtn = document.querySelector("#reset");

// iterators
let counter = 3;
let cpuCounter = 3;
// score trackers
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
    for (let i = 0; i < 52; i++) {
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

// pull a random card from the deck
function getCard() {
    let card = randomCardArray[Math.floor(Math.random() * randomCardArray.length)];
    // remove that card from the deck
    randomCardArray.pop(card)
    // console.log(randomCardArray)
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
    userCardsArray.push(userCard1)
    userCardsArray.push(userCard2)

    addCpuScore(cpuCard1);
    addCpuScore(cpuCard2);
    cpuCardsArray.push(cpuCard1)
    cpuCardsArray.push(cpuCard2)

    console.log(`Cpu assigned ${cpuCard1} and ${cpuCard2}. User assigned ${userCard1} and ${userCard2}`);
    console.log(`Cpu's card are ${cpuCardsArray}`)
    console.log(`User's card are ${userCardsArray}`)
    displayScore()
}

// Draw a new card for the user
function newCard() {
    // // get current card from the html tag
    // let currentIteration = `#userCard${counter}`;
    // // get the card element that is current
    // let cardElement = document.querySelector(currentIteration);
    // // newUserCard equals the Card element, also set that card equal to a new card value
    // let newUserCard = cardElement.innerText = getCard();
    
    // log the card element value
    console.log(`new card value = ${newUserCard}`);
    userCardsArray.push(newUserCard)
    console.log(`User's card are ${userCardsArray}`)
    
    // // display the card element
    // cardElement.style.display = "block";
    // // increment so if the user presses hitBtn again, we get a new card element
    // counter++;
    
    
    // add the new card value to the user's total score
    addScore(newUserCard);
    // display the score
    displayUserScore();
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
        userBust();
    }

    // return the score to the variable
    return numericalUserTotal;
}

function userBust(){
    document.querySelector(".result").innerText = "User Bust!";
    showResetBtn()
}

// function to call both score displays
function displayScore(){
    displayCpuScore()
    displayUserScore()
}


// Display the user score
function displayUserScore() {
    // display the current score
    document.querySelector(".userTotal").innerText = "User Total: " + numericalUserTotal;
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
    console.log(`new card value = ${newCpuCard}`);
    cpuCardsArray.push(newCpuCard)
    console.log(`new CPU cards are ${cpuCardsArray}`);
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
        cpuBust()
    } else if (numericalCpuTotal == numericalUserTotal) {
        cpuTie()
    } else {
        cpuWin()
    }

    showResetBtn();
}

function cpuWin(){
    console.log("CPU Wins!");
    document.querySelector(".result").innerText = "CPU Wins!";
}

function cpuTie(){
    console.log("CPU ties!");
    document.querySelector(".result").innerText = "CPU Ties!";
}

function cpuBust(){
    console.log("CPU busts!");
    document.querySelector(".result").innerText = "CPU Bust!";
}

// Reset the game state
function resetGame() {
    console.log("Resetting Game...");
    numericalUserTotal = 0;
    numericalCpuTotal = 0;
    document.querySelector(".result").innerText = "";

    removeCards()
    
    
}

function removeCards(){
    for (let i = counter; i <= 2; i--){
        let currentCard = document.querySelector(`#userCard${counter}`).display = "none";
        console.log("Removed card " + currentCard + " from user")
    }
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

