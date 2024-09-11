let today = new Date();

console.log(today);
console.dir(today);

let year = today.getFullYear();
alert(year);




// let month = today.getMonth();
// if(month === 8){
//     console.log("September");

// } else {
//     console.log("Not September");
// }

// let month = getMonthName(today.getMonth());
console.log(month);

// changeInnerText();

function displayDate(){
    document.querySelector("#current").innerText =  today.toDateString();
    document.querySelector("h2").innerText = today.toLocaleTimeString();
}






function getMonthName(monthIndex){

    if(monthIndex === 8){
    return "September!";
    } else {
    return "Not September";
}
}

