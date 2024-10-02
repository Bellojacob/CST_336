//Event Listeners
document.querySelector("#zip").addEventListener("change", displayCityInfo);
document.querySelector("#userPassword").addEventListener("click", suggestPassword)
document.querySelector("#username").addEventListener("change", captureUsername);
document.querySelector("#state").addEventListener("change", displayCounty)
document.querySelector("#userInput").addEventListener("click", buttonPress)

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
    if (!data.city) {
        document.querySelector("#city").innerText = "Zip code not found";
        document.querySelector("#city").style.color = "red"
        document.querySelector("#latitude").innerText = "";
        document.querySelector("#longitude").innerText = "";
    } else {
        document.querySelector("#city").innerText = data.city;
        document.querySelector("#latitude").innerText = data.latitude;
        document.querySelector("#longitude").innerText = data.longitude;
    }
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
    // let userIn = document.querySelector("#userPassword").value;
    let url = "https://csumb.space/api/suggestedPassword.php?length=8";
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);

    document.querySelector("#apiPassword").innerText = data.password;
    

    // if(userIn.length < 6){
    //     document.querySelector("#error").innerText = "Make length at least 6 or more characters!"
    //     document.querySelector("#error").style.color = "red";
    // } else {
    //     document.querySelector("#error").display = "none"
    // }

}

async function captureUsername() {
    let userName = document.querySelector("#username").value;
    let url = " https://csumb.space/api/usernamesAPI.php?username=" + userName;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);

    if(data.available == true && userName.length >= 3){
        document.querySelector("#feedback").innerText = "Username Available!";
        document.querySelector("#feedback").style.color = "green";
        
    }else{
        if (data.available == false){
        document.querySelector("#feedback").innerText = "Not Available!";
        document.querySelector("#feedback").style.color = "red";
        } else {
            document.querySelector("#feedback").innerText = "Please use at least 3 characters for your username!";
            document.querySelector("#feedback").style.color = "red";
        }
    }
}


async function buttonPress(){
    let userIn = document.querySelector("#userPassword").value;
    if(userIn.length < 6){
        document.querySelector("#error").innerText = "Please make password at least 6 characters"
        document.querySelector("#error").style.color = "red";
        
        document.querySelector("#passwordLength").innerText = "Please make password at least 6 characters"
        document.querySelector("#passwordLength").style.color = "red";
    } else {
        document.querySelector("#passwordLength").innerText = "Password Length Good!"
        document.querySelector("#passwordLength").style.color = "green";

        document.querySelector("#error").innerText = "Secure Password!"
        document.querySelector("#error").style.color = "green";

    }

    let userNameInput = document.querySelector("#username").value;
    let password1 = document.querySelector("#userPassword").value;
    let password2 = document.querySelector("#confirmPassword").value;
    console.log(userNameInput + "\n" + password1 + "\n" + password2);

    let userName = document.querySelector("#username").value;
    let url = " https://csumb.space/api/usernamesAPI.php?username=" + userName;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);


    if(data.available == true && userNameInput.length >= 3){
        document.querySelector("#userNameValid").innerText = "Username Good!";
        document.querySelector("#userNameValid").style.color = "green";
        
    }else{
        if (data.available == false){
        document.querySelector("#userNameValid").innerText = "Not Available!";
        document.querySelector("#userNameValid").style.color = "red";
        } else {
            document.querySelector("#userNameValid").innerText = "Please use at least 3 characters for your username!";
            document.querySelector("#userNameValid").style.color = "red";
        }
    }



    if (password1 == password2){
        document.querySelector("#passwordCheck").innerText = "Passwords Match!";
        document.querySelector("#passwordCheck").style.color = "green";
    } else {
        document.querySelector("#passwordCheck").innerText = "Passwords Do Not Match!";
        document.querySelector("#passwordCheck").style.color = "red";
    }
}