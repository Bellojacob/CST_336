let randomQuote = document.querySelector("#randomQuote")
let author = document.querySelector("#author")

document.querySelector("#authorInfoBtn").addEventListener("click", displayAuthorInfo)
document.querySelector("#translateBtn").addEventListener("click", translate)
document.querySelector("#getQuotesBtn").addEventListener("click", getQuotes)

getRandomQuote()
languageRadioBtns()

let data;

async function getRandomQuote(){
    let url = "https://webspace.csumb.edu/~lara4594/ajax/quotes/getRandomQuote.php"
    let response = await fetch(url)
    data = await response.json()
    console.log(data)

    randomQuote.innerText = data.quoteText
    author.innerText = "- " +  data.firstName + " " + data.lastName
}

async function displayAuthorInfo(){
    document.querySelector("#authorBio").innerText = data.bio
    let img = document.createElement("img");
    img.src = data.picture
    document.querySelector("#authorBio").appendChild(img)
}

function languageRadioBtns(){

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
    
                document.querySelector("#languageBtns").appendChild(buttonLabel);
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
    randomQuote.innerText = translation.translation
}

async function getQuotes() {
    let numOfQuotes = document.querySelector("#numOfQuotes").value
    let url = "https://webspace.csumb.edu/~lara4594/ajax/quotes/getQuotes.php?n=" + numOfQuotes
    let response = await fetch(url)
    let data = await response.json()
    console.log(data)
    for (let i =0; i < numOfQuotes; i++){
        document.querySelector("#quotes").innerText += data[i].quoteText + "\n\n\n"
        
    }
    
}