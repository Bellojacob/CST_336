displayQuote()
radioBtns()
displayBackground()
let data;

document.querySelector("#authorBtn").addEventListener("click", displayAuthorInfo)
document.querySelector("#translate").addEventListener("click", translate)
document.querySelector("#getQuotes").addEventListener("click", genQuotes)

async function displayQuote(){
    let quote = document.querySelector("#randomQuote")
    let author = document.querySelector("#author")

    let url = "https://webspace.csumb.edu/~lara4594/ajax/quotes/getRandomQuote.php"
    let response = await fetch(url)
    data = await response.json()
    console.log(data)

    quote.innerText = data.quoteText;
    author.innerText = "-" + data.firstName + " " + data.lastName
}

async function displayAuthorInfo(){


    let authorInfo = document.querySelector("#authorInfo")
    authorInfo.innerText = data.bio
    let img = document.createElement("img");
    img.src = data.picture
    
    authorInfo.appendChild(img)
}

function radioBtns(){
    let languages = ["Esperanto", "English", "Spanish", "French"];
        languages = _.shuffle(languages); //include shuffle link
        for (let i = 0; i < languages.length; i++) {
            let radioButton = document.createElement("input");
            radioButton.type = "radio";
            radioButton.name = "q1";
            radioButton.value = languages[i];
            radioButton.id = languages[i]

            let buttonLabel = document.createElement("label");
            buttonLabel.innerHTML = languages[i];
            buttonLabel.prepend(radioButton);	

	        document.querySelector("#languages").appendChild(buttonLabel);
	}
}

async function translate(){
    let flag = document.querySelector("#flag")
    let url;
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
        url = `https://webspace.csumb.edu/~lara4594/ajax/quotes/translateQuote.php?lang=${"ES"}&quoteId=${data.quoteId}`

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
    document.querySelector("#randomQuote").innerText = translation.translation
}

async function genQuotes(){
    let numOfQuotes = document.querySelector("#numOfQuotes").value
    let url = `https://webspace.csumb.edu/~lara4594/ajax/quotes/getQuotes.php?n=${numOfQuotes}`
    let response = await fetch(url)
    let quotes = await response.json()
    console.log(quotes)
    for (let i = 0; i < numOfQuotes; i++){
        document.querySelector("#generatedQuotes").innerText += quotes[i].quoteText + "\n"
    }
    
}

async function displayBackground(){
    let body = document.querySelector("body")
    let url = `https://api.unsplash.com/photos/random/?client_id=7756a1e81f817c186cf57294e1c19b37b49c54b8f34e7c499ee0ce5cd86cd16e&featured=true&query=flowers`
    let response = await fetch(url)
    let img = await response.json()
    console.log(img)
    // body.style.backgroundImage = "url('https://images.unsplash.com/photo-1486208081179-de7dbc1637b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MTE2NnwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyNzkyODkyN3w&ixlib=rb-4.0.3&q=80&w=1080')"
    // body.style.backgroundRepeat = "no-repeat"
    // body.style.backgroundPosition = "center"
    
    
}