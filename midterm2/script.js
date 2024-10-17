// console.log("This is working")

getSuperHeros()
document.querySelector("#checkAnswer").addEventListener("click", checkAnswer)


let cityChosen;
let superheroID;
let superheroFullName;
// let superheroArray = [];

async function getSuperHeros(){
    let url = `https://csumb.space/api/superheroesAPI.php`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);

    // for (let i of data){
    //     superheroArray.push(i.name);
    // }

    // console.log(superheroArray);
    // superheroArray = _.shuffle(superheroArray);
    // console.log("Array shuffled: " + superheroArray);

    superheroFullName = data[0].firstName + " " + data[0].lastName;
    console.log(data[0].name);
    console.log(data[0].image);


    superheroID = data[0].id;

    let superheroImg = document.querySelector("#superHeroImg")

    let img = document.createElement("img");
        img.src = "img/"+data[0].image+".png"
        superheroImg.appendChild(img)


    document.querySelector("#dropdown").innerText = "";
    
    for(let i of data){
        let optionElement = document.createElement("option");
        optionElement.innerText = i.firstName + " " + i.lastName;
        optionElement.value = i.firstName + " " + i.lastName;
        document.querySelector("#dropdown").appendChild(optionElement);
    }

    document.querySelector("#questionTwo").innerText = "Where was " + data[0].name + " born?"

    let cities = ["New-York", "Krypton", "Bulgaria", "Gotham-City", "Ohio"]
    cities = _.shuffle(cities);
    for (let i = 0; i < cities.length; i++) {
        let radioButton = document.createElement("input");
        radioButton.type = "radio";
        radioButton.name = "q1";
        radioButton.value = cities[i];
        radioButton.id = cities[i];

        let buttonLabel = document.createElement("label");
        buttonLabel.innerHTML = cities[i];
        buttonLabel.prepend(radioButton);	

        document.querySelector("#questionTwo").appendChild(buttonLabel);
}

if (document.querySelector("#New-York").checked){
    cityChosen = "New-York"
    

} 
if (document.querySelector("#Krypton").checked){
    cityChosen = "Krypton"
}
if (document.querySelector("#Bulgaria").checked){
    cityChosen = "Bulgaria"


} 
if (document.querySelector("#Gotham-City").checked){
    cityChosen = "Gotham-City"


}
if (document.querySelector("#Ohio").checked){
    cityChosen = "Ohio"


}

console.log(cityChosen)
}

async function checkAnswer(){
    let url = `https://csumb.space/api/superheroesAPI.php?heroId=${superheroID}&pob=${cityChosen}`
    let response = await fetch(url)
    let data = await response.json()
    console.log("city chosesn is " + cityChosen)
    console.log("super hero id is " + superheroID)
    console.log("This is the answer " + data.answer)
    console.log(superheroFullName)
    

    if (document.querySelector("#dropdown").value == superheroFullName){
        document.querySelector("#feedbackQ1").innerText = "Correct!"
        document.querySelector("#feedbackQ1").style.color = "green"
    } else {
        document.querySelector("#feedbackQ1").innerText = "Wrong"
        document.querySelector("#feedbackQ1").style.color = "red"
    }

    if (data == true){
        document.querySelector("#feedbackQ2").innerText = "Correct!"
        document.querySelector("#feedbackQ2").style.color = "green"
    }

}