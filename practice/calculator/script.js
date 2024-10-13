let answerSection = document.querySelector("#answer")
// let btn1 = document.querySelector("#one").addEventListener("click", pressedOne)

// let btn4 = document.querySelector("#four").addEventListener("click", pressedFour)

// let btn5 = document.querySelector("#five").addEventListener("click", pressedFive)

let btnAdd = document.querySelector("#add").addEventListener("click", pressedAdd);
let btnSubtract = document.querySelector("#subtract").addEventListener("click", pressedSubtract);
let btnClear = document.querySelector("#clear").addEventListener("click", pressedClear);
let btnEquals = document.querySelector("#equals").addEventListener("click", pressedEquals);
document.querySelector("#multiply").addEventListener("click", pressedMultiply);
document.querySelector("#divide").addEventListener("click", pressedDivide);

let firstNum = null;
let operator = null;



document.querySelector("#one").addEventListener("click", () => pressedNumber(1));
document.querySelector("#two").addEventListener("click", () => pressedNumber(2));
document.querySelector("#three").addEventListener("click", () => pressedNumber(3));
document.querySelector("#four").addEventListener("click", () => pressedNumber(4));
document.querySelector("#five").addEventListener("click", () => pressedNumber(5));
document.querySelector("#six").addEventListener("click", () => pressedNumber(6));
document.querySelector("#seven").addEventListener("click", () => pressedNumber(7));
document.querySelector("#eight").addEventListener("click", () => pressedNumber(8));
document.querySelector("#nine").addEventListener("click", () => pressedNumber(9));
document.querySelector("#zero").addEventListener("click", () => pressedNumber(0));

function pressedNumber(num) {
    if (answerSection.innerText == "+" || answerSection.innerText == "-" || answerSection.innerText == "*" ||
        answerSection.innerText == "/" ||answerSection.innerText == 0) {
        answerSection.innerText = num;
    } else {
        answerSection.innerText += num;
    }
}

function pressedAdd() {
    firstNum = parseFloat(answerSection.innerText);
    operator = "+";
    answerSection.innerText = "+";
}

function pressedEquals() {
    let secondNum = parseFloat(answerSection.innerText);
    let result;
    if (operator === "+") {
        result = firstNum + secondNum;
    } 
    else if (operator === "-") {
        result = firstNum - secondNum;
    }
    else if (operator === "*") {
        result = firstNum * secondNum;
    }
    else if (operator === "/") {
        result = firstNum / secondNum;
    }
    answerSection.innerText = result;
}

function pressedSubtract() {
    firstNum = parseFloat(answerSection.innerText);
    operator = "-";
    answerSection.innerText = "-";
}

function pressedMultiply() {
    firstNum = parseFloat(answerSection.innerText);
    operator = "*";
    answerSection.innerText = "*";
}

function pressedDivide() {
    firstNum = parseFloat(answerSection.innerText);
    operator = "/";
    answerSection.innerText = "/";
}



function pressedClear() {
    firstNum = null;
    operator = null;
    answerSection.innerText = "0";
}