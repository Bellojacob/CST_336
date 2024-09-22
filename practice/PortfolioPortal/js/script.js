let userName = document.querySelector("#userName")
userName.textContent = "Jacob Bello"

document.querySelector(".resumeBtn").addEventListener("click", resume)

document.querySelector(".linkedInBtn").addEventListener("click", linkedIn)

document.querySelector(".websiteBtn").addEventListener("click", openWebsite)

document.querySelector(".githubBtn").addEventListener("click", openGithub)

let resumeFile = "resumeFolder/JacobBelloResumeSummer24.pdf"

let linkedIn_link = "https://www.linkedin.com/in/bellojacob/"

let websiteLink = "https://jacob-bello.tech"

let githubLink = "https://github.com/Bellojacob"

function linkedIn(){
    window.open(linkedIn_link, "_blank")
}

function resume(){
    window.open(resumeFile, "_blank")
}

function openWebsite(){
    window.open(websiteLink, "_blank")
}

function openGithub(){
    window.open(githubLink, "_blank")
}