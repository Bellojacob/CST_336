import express from 'express';
const planets = (await import ('npm-solarsystem')).default;

let planetInfo;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', (req, res) => {
   res.render("home.ejs")
});

<<<<<<< HEAD
app.get('/rock',(req, res) => {
  let rock = req.query.rockName;
  console.log(rock);

  let rockInfo;
  rockInfo = planets[`get${rock}`]();

  res.render('planetInfo.ejs', {rockInfo, rock})
=======
app.get('/planet', (req, res) => {
   let planet =  req.query.planetName;
   console.log(planet);
   
   if (planet == "Venus"){
      planetInfo = planets.getVenus();
   }
   res.render("planetInfo.ejs", {planetInfo, planet})
>>>>>>> cb5e8ff7b81bac7755ccadc0f7546cc0b2dda6b5
});

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



 app.get('/saturn', (req, res) => {
    let saturn = planets.getSaturn();
    res.render("saturn.ejs", {saturn})
 });

 app.get('/jupiter', (req, res) => {
  let jupiter = planets.getJupiter();
  res.render("jupiter.ejs", {jupiter})
});

app.get('/uranus', (req, res) => {
  let uranus = planets.getUranus();
  res.render("uranus.ejs", {uranus})
});

app.get('/neptune', (req, res) => {
  let neptune = planets.getNeptune();
  res.render("neptune.ejs", {neptune})
});


app.listen(3000, () => {
   console.log('server started');
});
