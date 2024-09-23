document.querySelector("button").addEventListener("click", gradeQuiz);
displayQ4Choices();

var score = 0;
var attempts = localStorage.getItem("total_attempts");

function displayQ4Choices(){
    let q4ChoicesArray = ["John Stockton", "Jerry West", "Jason Kidd", "Steve Nash"]
    q4ChoicesArray = _.shuffle(q4ChoicesArray);
    for(let i = 0; i < q4ChoicesArray.length; i++){
        document.querySelector("#q4Choices").innerHTML += `<div style="padding: 5px; font-size: 20px;"><input type="radio" name="q4" id="${q4ChoicesArray[i]}"
        value="${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]}</label></div>`;
    }
}

function isFormValid(){
    let isValid = true;
    if (document.querySelector("#q1").value == "" ){
        isValid = false;
        let validation = document.querySelector("#validation")
        validation.innerHTML = "Question 1 was not answered.";
        validation.style.backgroundColor = "red";
        validation.style.color = "white"
    } 
    return isValid
}


function gradeQuiz(){
    console.log("Grading Quiz...")
    document.querySelector("#validation").innerHTML = "";
    if (!isFormValid()){
        return;
    }
    
    score = 0;
    let q1Response = document.querySelector("#q1").value.toLowerCase();
    let q2Response = document.querySelector("#q2").value.toLowerCase();
    let q4Response = document.querySelector("input[name=q4]:checked").value
    let q5Response = document.querySelector("#q5Input").value
    console.log(q1Response)
    console.log(q2Response)
    console.log(q4Response)
    console.log(q5Response)

    let q1FeedbackSection = document.querySelector("#feedbackQ1")
    let q2FeedbackSection = document.querySelector("#feedbackQ2")
    let q1Mark = document.querySelector("#markQ1")
    let q2Mark = document.querySelector("#markQ2")
    let q3FeedbackSection = document.querySelector("#feedbackQ3")
    let q3Mark = document.querySelector("#markQ3")
    let q4FeedbackSection = document.querySelector("#feedbackQ4")
    let q4Mark = document.querySelector("#markQ4")
    let q5FeedbackSection = document.querySelector("#feedbackQ5")
    let q5Mark = document.querySelector("#markQ5")

    // q1 grading
    if (q1Response == "tom brady"){

        q1FeedbackSection.innerHTML = "Correct"
        q1FeedbackSection.style.backgroundColor = "green"
        q1FeedbackSection.style.color = "white"
        q1Mark.innerHTML = "<img src='images/checkmark.png' alt='checkmark' style='width: 20px; height: 20px;'>"
        score += 20;


    } else {
        q1FeedbackSection.innerHTML = "Incorrect"
        q1FeedbackSection.style.backgroundColor = "red"
        q1FeedbackSection.style.color = "white"
        q1Mark.innerHTML = "<img src='images/xmark.webp' alt='xmark' style='width: 20px; height: 20px;'>"

    }

    // q2 grading
    if (q2Response == "lh"){

        q2FeedbackSection.innerHTML = "Correct"
        q2FeedbackSection.style.backgroundColor = "green"
        q2FeedbackSection.style.color = "white"
        q2Mark.innerHTML = "<img src='images/checkmark.png' alt='checkmark' style='width: 20px; height: 20px;'>"
        score += 20;


    } else {
        q2FeedbackSection.innerHTML = "Incorrect"
        q2FeedbackSection.style.backgroundColor = "red"
        q2FeedbackSection.style.color = "white"
        q2Mark.innerHTML = "<img src='images/xmark.webp' alt='xmark' style='width: 20px; height: 20px;'>"

    }

    if (document.querySelector("#bonds").checked && !document.querySelector("#judge").checked &&
    !document.querySelector("#ruth").checked && !document.querySelector("#sosa").checked) {
        q3FeedbackSection.innerHTML = "Correct"
        q3FeedbackSection.style.backgroundColor = "green"
        q3FeedbackSection.style.color = "white"
        q3Mark.innerHTML = "<img src='images/checkmark.png' alt='checkmark' style='width: 20px; height: 20px;'>"
        score += 20;
    } else {
        q3FeedbackSection.innerHTML = "Incorrect"
        q3FeedbackSection.style.backgroundColor = "red"
        q3FeedbackSection.style.color = "white"
        q3Mark.innerHTML = "<img src='images/xmark.webp' alt='xmark' style='width: 20px; height: 20px;'>"
    }
    
    //grade q4
    if (q4Response == "John Stockton"){
        q4FeedbackSection.innerHTML = "Correct"
        q4FeedbackSection.style.backgroundColor = "green"
        q4FeedbackSection.style.color = "white"
        q4Mark.innerHTML = "<img src='images/checkmark.png' alt='checkmark' style='width: 20px; height: 20px;'>"
        score += 20;
    } else {
        q4FeedbackSection.innerHTML = "Incorrect"
        q4FeedbackSection.style.backgroundColor = "red"
        q4FeedbackSection.style.color = "white"
        q4Mark.innerHTML = "<img src='images/xmark.webp' alt='xmark' style='width: 20px; height: 20px;'>"
    }

        //grade q5
        if (q5Response == 4){
            q5FeedbackSection.innerHTML = "Correct"
            q5FeedbackSection.style.backgroundColor = "green"
            q5FeedbackSection.style.color = "white"
            q5Mark.innerHTML = "<img src='images/checkmark.png' alt='checkmark' style='width: 20px; height: 20px;'>"
            score += 20;
        } else {
            q5FeedbackSection.innerHTML = "Incorrect"
            q5FeedbackSection.style.backgroundColor = "red"
            q5FeedbackSection.style.color = "white"
            
            q5Mark.innerHTML = "<img src='images/xmark.webp' alt='xmark' style='width: 20px; height: 20px;'>"
        }


    if (score > 79){
        document.querySelector("#totalScore").innerHTML = "Good Job!<br>";
    }
    document.querySelector("#totalScore").innerHTML += `Total Score: ${score}  / 100`

    document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${++attempts}`;
    localStorage.setItem("total_attempts", attempts);
}