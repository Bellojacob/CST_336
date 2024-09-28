//Event Listeners
document.querySelector("#zip").addEventListener("change", displayCityInfo);
document.querySelector("#userPassword").addEventListener("click", suggestPassword)
document.querySelector("#username").addEventListener("change", captureUsername);
document.querySelector("#state").addEventListener("change", displayCounty)

let stateLetters;
displayStates();
displayCounty();

async function displayCityInfo() {
    let zipCode = document.querySelector("#zip").value;
    let url="https://csumb.space/api/cityInfoAPI.php?zip=" + zipCode;
    //or can do `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    document.querySelector("#city").innerText = data.city;
    document.querySelector("#latitude").innerText = data.latitude;
    document.querySelector("#longitude").innerText = data.longitude;
}

async function displayStates() {
    let url =  "https://csumb.space/api/allStatesAPI.php";
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);

    for(let i of data){
        let optionEl = document.createElement("option");
        optionEl.innerText = i.state;
        optionEl.value = i.usps;

        document.querySelector("#state").appendChild(optionEl);
    }
}

async function displayCounty() {
    let state = document.querySelector("#state").value;
    let url =  " https://csumb.space/api/countyListAPI.php?state=" + state;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data.usps);

    document.querySelector("#county").innerText = "";

    for(let i of data){
        let optionElement = document.createElement("option");
        optionElement.innerText = i.county;
        optionElement.value = i.county;
        document.querySelector("#county").appendChild(optionElement);
    }

}

async function suggestPassword() {
    let userIn = document.querySelector("#userPassword").value;
    let url = "https://csumb.space/api/suggestedPassword.php?length=8";
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);

    document.querySelector("#apiPassword").innerText = data.password;

    if(userIn.length < 6){
        document.querySelector("#error").innerText = "Make length at least 6 or more characters!"
        document.querySelector("#error").style.color = "red";
    }

}

async function captureUsername() {
    let userName = document.querySelector("#username").value;
    let url = " https://csumb.space/api/usernamesAPI.php?username=" + userName;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);

    if(data.available == true){
        document.querySelector("#feedback").innerText = "Cool";
    }else{
        document.querySelector("#feedback").innerText = "Not Available!";
    }
}
