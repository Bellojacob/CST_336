let animals = ["Dog", "Cat", "Hamster"]

for (x in animals){
    document.querySelector("#petArray").innerText += " " + animals[x] + " "
}


document.querySelector("#addAnimalBtn").addEventListener("click", addAnimal)

function addAnimal(){
    let userInput = document.querySelector("#userIn").value
    animals.unshift(userInput)
    document.querySelector("#petArray").innerText = "Pet Array: "
    for (x in animals){
        
        document.querySelector("#petArray").innerText += " " + animals[x] + " "
    }
}


document.querySelector("#numInput").value
document.querySelector("#showPets").addEventListener("click", showPets)

function showPets(){
    let userNumInput = document.querySelector("#numInput").value
    
    if (userNumInput > animals.length){
        document.querySelector("#showPetsError").innerText = `Number must not exceed ${animals.length}`
        document.querySelector("#showPetsError").style.color = "red"
    } else {
        if(userNumInput == 0 ){
            userNumInput = animals.length;
        }
        
        // for (let i = 0; i < userNumInput; i++){
        //     document.querySelector("#showPetsArrayAgain").innerText += " " + animalChoices[i] + " "
            
        // }
        if (document.querySelector("#checkbox1").checked){
        animalChoices = _.shuffle(animals); //include shuffle link
        for (let i = 0; i < userNumInput; i++) {
            let radioButton = document.createElement("input");
            radioButton.type = "radio";
            radioButton.name = "q1";
            radioButton.value = animalChoices[i];

            let buttonLabel = document.createElement("label");
            buttonLabel.innerHTML = animalChoices[i];
            buttonLabel.prepend(radioButton);	

	        document.querySelector("#animalsRadioBtns").appendChild(buttonLabel);
	}
    } else {
        animalChoices = animals.sort();
        for (let i = 0; i < userNumInput; i++) {
            let radioButton = document.createElement("input");
            radioButton.type = "radio";
            radioButton.name = "q1";
            radioButton.value = animalChoices[i];

            let buttonLabel = document.createElement("label");
            buttonLabel.innerHTML = animalChoices[i];
            buttonLabel.prepend(radioButton);	

	        document.querySelector("#animalsRadioBtns").appendChild(buttonLabel);
	}
    }
}
}

document.querySelector("#showImg").addEventListener("click", showImg)




