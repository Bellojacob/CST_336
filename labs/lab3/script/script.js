// alert("hola")

// event listeners
document.querySelector("button").addEventListener("click", gradeQuiz)

displayQ2Choices()

function gradeQuiz(){

    console.log("Grading Quiz...")
    let q1UserAnswer = document.querySelector("input[name=q1]:checked").value
    // alert(q1UserAnswer)
    // if (q1UserAnswer == "color"){
    //     alert("Correct")
    // } else{
    //     alert("Incorrect")
    // }



}

function displayQ2Choices(){
    let q2Choices = ["color", "fontColor", "textColor", "backgroundColor"]
    q2Choices = _.shuffle(q2Choices)
    // document.querySelector("#q2Choices").innerHTML = `<label>
    // <input name="q2" type="radio" value="${q2Choices[1]}"> ${q2Choices[1]} </label>`;


    for (let choice of q2Choices){

    
        let inputEl = document.createElement("input");
        inputEl.name = "q2";
        inputEl.type = "radio";
        inputEl.value = choice;
        // console.log(inputEl)

        let labelEl = document.createElement("label");
        labelEl.innerText = choice;
        // console.log(labelEl)

        labelEl.prepend(inputEl);
        document.querySelector("#q2Choices").appendChild(labelEl);

    }

}