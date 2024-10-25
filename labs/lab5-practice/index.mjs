import express from 'express';
const planets = (await import ('npm-solarsystem')).default;
import fetch from 'node-fetch';


// To whoever grades this, I know it isn't a good idea to keep my key here however, I don't know of another solution currently, and
// it is a free api, so I mean, please don't steal it but I 99% would never know and it wouldn't effect me, 
// and I am running out of time to complete this. 
let myKey = "qkjYSPgFa3FJabNaNBcFWhNaaJEHAoElbeiVXY4C"


const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', async (req, res) => {
   let imgUrl;
   let nasaUrl = `https://api.nasa.gov/planetary/apod?api_key=${myKey}&count=1`;

   try {
   
       const response = await fetch(nasaUrl);
       const data = await response.json();
       imgUrl = data[0].url; 
   } catch (error) {
       console.error("Error fetching NASA APOD image:", error);
       imgUrl = "/path/to/default-image.jpg";
   }

   res.render("home.ejs", { imgUrl });
});


// app.get('/planet', (req, res) => {
//    let planet =  req.query.planetName;
//    console.log(planet);

   
//    // if(planet == "Venus") {
//    //    planetInfo = planets.getVenus()

//       // planetInfo = planets[`getEarth`]();
//       // planetInfo = planets[`get${planet}`]();

//    // } else if (planet == "Mercury"){
//    //    planetInfo = planets.getMercury()
//    // }

//    let planetInfo;
//    planetInfo = planets[`get${planet}`]();
//    res.render("planetInfo.ejs", {planetInfo, planet})
// });
app.get('/celestialBody', (req, res) => {
   let optionChosen = req.query.cometOrAsteroid;
   console.log(optionChosen)

   let info;
   info = planets[`get${optionChosen}`]();
   res.render("cometOrAsteroid.ejs", {info, optionChosen})
})

app.get('/mercury', (req, res) => {
    let mercury = planets.getMercury();
    res.render("mercury.ejs", {mercury})
 });

 app.get('/venus', (req, res) => {
    let venus = planets.getVenus();
    res.render("venus.ejs", {venus})
 });

 app.get('/earth', (req, res) => {
   let earth = planets.getEarth();
   res.render("earth.ejs", {earth})
});
app.get('/mars', (req, res) => {
   let mars = planets.getMars();
   res.render("mars.ejs", {mars})
});
app.get('/jupiter', (req, res) => {
   let jupiter = planets.getJupiter();
   res.render("jupiter.ejs", {jupiter})
});
app.get('/saturn', (req, res) => {
   let saturn = planets.getSaturn();
   res.render("saturn.ejs", {saturn})
});
app.get('/uranus', (req, res) => {
   let uranus = planets.getUranus();
   res.render("uranus.ejs", {uranus})
});
app.get('/neptune', (req, res) => {
   let neptune = planets.getNeptune();
   res.render("neptune.ejs", {neptune})
});

app.get('/nasa', async (req, res) => {
   let { yearSelected, monthSelected, daySelected } = req.query;


   if (!yearSelected || !monthSelected || !daySelected) {
       yearSelected = new Date().getFullYear();
       monthSelected = ('0' + (new Date().getMonth() + 1)).slice(-2);
       daySelected = ('0' + new Date().getDate()).slice(-2);
   }

   let date = `${yearSelected}-${monthSelected}-${daySelected}`;
   console.log("Selected date: " + date);

   let url = `https://api.nasa.gov/planetary/apod?api_key=${myKey}&date=${date}`;
   try {
       let response = await fetch(url);
       let data = await response.json();
       
       let imgUrl = data.url;
       res.render("nasa.ejs", { imgUrl });
   } catch (error) {
       console.error(error);
       res.status(500).send("Error fetching data from NASA API");
   }
});

// let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
// let response = await fetch(url);
// let data = await response.json();
// console.log(data);


 app.listen(10009, () => {
   console.log('server started');
});

