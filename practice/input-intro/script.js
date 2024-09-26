document.querySelector("#textColorBtn").addEventListener("click", changeColor);

document.querySelector("#textSizeBtn").addEventListener("click", changeSize);

document.querySelector("#bgColorBtn").addEventListener("click", changeBgColor);

document.querySelector("#alignmentBtn").addEventListener("click", centered);{

function changeColor(){
    console.log("clicked")
    let textColor = document.querySelector("#textColor").value;
    document.querySelector("body").style.color = textColor;
}

function changeSize(){
    let textSize = document.querySelector("#numberInput").value;
    document.querySelector("body").style.fontSize = textSize + "em";
}

function changeBgColor(){
    let bgColor = document.querySelector("#bgColor").value;
    document.querySelector("body").style.backgroundColor = bgColor;
}


function centered(){

    if (document.querySelector("#alignment").checked) {

        document.querySelector("body").style.textAlign = "center";
    }
}
}

 