document.querySelector("#zipCodeInput").addEventListener("change", zipCodeAdded)
document.querySelector("#states").addEventListener("change", addCounties)
document.querySelector("#username").addEventListener("change", checkUsername)
document.querySelector("#password").addEventListener("click", checkPassword)
document.querySelector("#btn").addEventListener("click", validateInfo)


let zipCodeInput = document.querySelector("#zipCodeInput")

addStates()

let stateData;

async function zipCodeAdded(){
    let zipCodeValue = document.querySelector("#zipCodeInput").value
    console.log(zipCodeValue)

    let url = "https://csumb.space/api/cityInfoAPI.php?zip="+zipCodeValue
    let response = await fetch(url);
    let data = await response.json();
    console.log(data)

    document.querySelector("#city").innerText = data.city
    document.querySelector("#lat").innerText = data.latitude
    document.querySelector("#long").innerText = data.longitude

    if (data == false){
        document.querySelector("#error").innerText = "ERROR"
        document.querySelector("#error").style.color = "red"
    }


}

// add dropdown of states
async function addStates(){
    let url =  "https://csumb.space/api/allStatesAPI.php"
    let response = await fetch(url);
    stateData = await response.json();
    console.log(stateData)

    
    for(let i of stateData){
        let optionEl = document.createElement("option");
        optionEl.innerText = i.state;
        optionEl.value = i.usps;

        document.querySelector("#states").appendChild(optionEl);
    }
}

async function addCounties(){
    let state = document.querySelector("#states").value
    let url = 'https://csumb.space/api/countyListAPI.php?state=' + state
    let response = await fetch(url)
    let countyData = await response.json()
    console.log(countyData)

    for(let i of countyData){
        let countyEl = document.createElement("option");
        countyEl.innerText = i.county
        countyEl.value = i.county

        document.querySelector("#counties").appendChild(countyEl)
    }

}

async function checkUsername(){
    let username = document.querySelector("#username").value
    let url = "https://csumb.space/api/usernamesAPI.php?username="+username
    let response = await fetch(url)
    let data = await response.json()
    console.log(data)
    if(data.available == true){
        // alert("Good to go!")
        document.querySelector("#usernameValid").innerText = "Valid Username"
        document.querySelector("#usernameValid").style.color = "green"
    } else {
        document.querySelector("#usernameValid").innerText = "Username taken"
        document.querySelector("#usernameValid").style.color = "red"
    }
}

async function checkPassword(){
    let url = "https://csumb.space/api/suggestedPassword.php?length=8"
    let response = await fetch(url)
    let data = await response.json()
    console.log(data)
    document.querySelector("#suggestPassword").innerText = data.password
}

function validateInfo(){
    let username = document.querySelector("#username").value
    let password = document.querySelector("#password").value
    let password2 = document.querySelector("#passwordAgain").value

    if (username.length < 3){
        document.querySelector("#username3Char").innerText = "Username must be greater than 3 characters"
        document.querySelector("#username3Char").style.color = "red"
    } else {
        document.querySelector("#username3Char").innerText = "Username good"
        document.querySelector("#username3Char").style.color = "green"
    }

    if (password.length < 6){
        document.querySelector("#password6Char").innerText = "Password must be greater than 6 characters"
        document.querySelector("#password6Char").style.color = "red"
    } else {
        document.querySelector("#password6Char").innerText = "Password good"
        document.querySelector("#password6Char").style.color = "green"
    }

    if (password == password2){
        document.querySelector("#matchingPasswords").innerText = "Passwords match!"
        document.querySelector("#matchingPasswords").style.color = "green"
    } else {
        document.querySelector("#matchingPasswords").innerText = "Passwords don't match!"
        document.querySelector("#matchingPasswords").style.color = "red"
    }
}