// console.log("this is working")
displayQuote()
radioBtns()

let data;

document.querySelector("#authorBtn").addEventListener("click", displayAuthorInfo)
document.querySelector("#translate").addEventListener("click", translate)
document.querySelector("#getQuotes").addEventListener("click", getQuotes)


async function displayQuote(){
    let url = "https://webspace.csumb.edu/~lara4594/ajax/quotes/getRandomQuote.php"
    let response = await fetch(url)
    data = await response.json()
    console.log(data)

    document.querySelector("#quote").innerText = data.quoteText
    document.querySelector("#author").innerText = "- " + data.firstName + " " + data.lastName;

}

function displayAuthorInfo(){
    document.querySelector("#authorBio").innerText = data.bio
    let img = document.createElement("img");
    img.src = data.picture
    document.querySelector("#authorBio").appendChild(img)
    

}

function radioBtns(){
let languages = ["Esperanto", "English", "Spanish", "French"]

        languages = _.shuffle(languages); //include shuffle link
        for (let i = 0; i < languages.length; i++) {
            let radioButton = document.createElement("input");
            radioButton.type = "radio";
            radioButton.name = "q1";
            radioButton.value = languages[i];
            radioButton.id = languages[i];

            let buttonLabel = document.createElement("label");
            buttonLabel.innerHTML = languages[i];
            buttonLabel.prepend(radioButton);	

	        document.querySelector("#radioBtns").appendChild(buttonLabel);
	}
}

async function translate(){
    let flag = document.querySelector("#flag")
    let url;

    flag.innerText = ""


    if (document.querySelector("#Spanish").checked){
        let img = document.createElement("img");
        img.src = "img/spanish_flag.png"
        flag.appendChild(img)
        url = `https://webspace.csumb.edu/~lara4594/ajax/quotes/translateQuote.php?lang=${"SP"}&quoteId=${data.quoteId}`

    } 
    if (document.querySelector("#English").checked){
        let img = document.createElement("img");
        img.src = "img/english_flag.png"
        flag.appendChild(img)
        url = `https://webspace.csumb.edu/~lara4594/ajax/quotes/translateQuote.php?lang=${"EN"}&quoteId=${data.quoteId}`

    }
    if (document.querySelector("#French").checked){
        let img = document.createElement("img");
        img.src = "img/french_flag.png"
        flag.appendChild(img)
        url = `https://webspace.csumb.edu/~lara4594/ajax/quotes/translateQuote.php?lang=${"FR"}&quoteId=${data.quoteId}`

    } 
    if (document.querySelector("#Esperanto").checked){
        let img = document.createElement("img");
        img.src = "img/esperanto_flag.png"
        flag.appendChild(img)
        url = `https://webspace.csumb.edu/~lara4594/ajax/quotes/translateQuote.php?lang=${"ES"}&quoteId=${data.quoteId}`

    }

    let response = await fetch(url)
    let translation = await response.json()
    console.log(translation.translation)
    document.querySelector("#quote").innerText = translation.translation
}

async function getQuotes(){
    document.querySelector("#displayQuotes").innerText = ""
    let userInput = document.querySelector("#userInput").value
    let url = `https://webspace.csumb.edu/~lara4594/ajax/quotes/getQuotes.php?n=${userInput}`
    let response = await fetch(url)
    let data = await response.json()
    console.log(data)
    let quoteArea = document.querySelector("#displayQuotes")
    for (let i= 0; i <userInput + 1; i++){
        quoteArea.innerText += data[i].quoteText + "\n-" + data[i].firstName + " " + data[i].lastName + "\n\n"
    }

}


