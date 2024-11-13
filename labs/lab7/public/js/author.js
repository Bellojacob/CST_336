// alert("Author Validation");

document.querySelector("form").addEventListener("submit", validateAuthor);

function validateAuthor(event){
    // event.preventDefault();  prevent the form from submitting
    let fName = document.querySelector("input[name=firstName]").value;
    alert(fName);
    alert("Author Validating data...");

    let isValid = true;

    if (fName.length < 3){
        alert("First name must be at least 3 characters long");
        isValid = false;
    }

    if (!isValid){
        event.preventDefault();
    }
}
