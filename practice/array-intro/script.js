let weekdays = ["wednesday"]
console.log(weekdays)

weekdays.push("Thursday", "Friday")
weekdays.unshift("Monday", "Tuesday")

console.log(weekdays)

weekdays.splice(1,1,"Martes")

console.log(weekdays)


// [weekdays[0],weekdays[3]] = [weekdays[3],weekdays[0]]
// console.log(weekdays)



weekdays = _.shuffle(weekdays);
console.log(weekdays)

document.querySelector("h1").innerText = weekdays[0]

for (let day of weekdays){
    console.log(day)
    
}