import { shuffle } from 'fast-shuffle' 
import fetch from 'node-fetch';
const quotes = (await import("success-motivational-quotes")).default;


let url = "https://csumb.space/api/famousQuotes/getRandomQuote.php"
let response = await fetch(url)
let data = await response.json
console.log(data)

console.log("Hello!!!")

let letters = ["a","b","c","d"]

const shuffledDeck = shuffle(letters)
console.log(letters)
console.log(shuffledDeck)


// function declaration
function displayQuote(){

    console.log(quotes.getTodaysQuote());
}
displayQuote()

// function Expression
// have to be declared before they are be called
// ex: function calls have to below the function expression
 const displayQuote2 = function(){
    console.log(quotes.getTodaysQuote());
}


