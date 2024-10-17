import express from 'express';
const planets = (await import ('npm-solarsystem')).default;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', (req, res) => {
   res.render("home.ejs")
});

app.get('/planet', (req, res) => {
   let planet =  req.query.planetName;
   console.log(planet);
   res.render("home.ejs")
});

app.get('/mercury', (req, res) => {
    let mercury = planets.getMercury();
    res.render("mercury.ejs", {mercury})
 });

 app.get('/venus', (req, res) => {
    let venus = planets.getVenus();
    res.render("venus.ejs", {venus})
 });

 app.get('/mars', (req, res) => {
    let mars = planets.getMars();
    res.render("mars.ejs", {mars})
 });



 app.get('/saturn', (req, res) => {
    let saturn = planets.getSaturn();
    res.render("saturn.ejs", {saturn})
 });

app.listen(3000, () => {
   console.log('server started');
});