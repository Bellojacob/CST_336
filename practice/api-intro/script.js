console.log("This is working!")
displayMovieData();

async function displayMovieData(){
    let url = "https://www.omdbapi.com/?apikey=12215ee6&s=beetlejuice";

    let response = await fetch(url);

    // console.log(response);

    let data = await response.json();

    // console.log(data);


    for (let i = 0; i < data.Search.length; i++){
            let h1El = document.createElement("h1");
    h1El.innerText = data.Search[i].Title;

    document.querySelector("#movies").appendChild(h1El);

    let imgEl = document.createElement("img");
    imgEl.src = data.Search[i].Poster;

    document.querySelector("#movies").appendChild(imgEl);
    }

 
}

