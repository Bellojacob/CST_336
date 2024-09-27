// console.log("Hello")

document.querySelector("#zip").addEventListener("change", displayCityInfo)

displayStates()

async function displayCityInfo(){
    let zipCode = document.querySelector("#zip").value;
    let url = "https://csumb.space/api/cityInfoAPI.php?zip=" + zipCode;
    let response = await fetch(url)
    let data = await response.json()
    console.log(data)
    document.querySelector("#city").innerText = data.city

}

async function displayStates(){
    let url = "https://csumb.space/api/allStatesAPI.php"
    let response = await fetch(url)
    let data = await response.json()
    console.log(data)


    for (let i of data){
        let optionEl = document.createElement("option")
        optionEl.innerText = i.state

        optionEl.value = i.usps
        document.querySelector("#state").appendChild(optionElement)
    }
}

