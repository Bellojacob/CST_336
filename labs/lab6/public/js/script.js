document.querySelector("#keywordSearch").addEventListener("change", validateKeywordSearch);
document.querySelector("#error").style.display = "none";


function validateKeywordSearch(){
    let keyword = document.querySelector("#keywordSearch").value;
    if (keyword.length < 3){
        document.querySelector("#error").style.display = "block";
        document.querySelector("#error").innerHTML = "Keyword must be at least 3 characters long";
        document.querySelector("#error").style.color = "red";
    } else {
        document.querySelector("#error").style.display = "none";
        
    }
}