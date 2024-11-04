import express from 'express';
const app = express();
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
app.set("view engine", "ejs");
app.use(express.static("public"));

const apiKey = process.env.API_KEY
const googleApiKey = process.env.GOOGLE_MAPS_API_KEY
// console.log("My API KEY IS " + apiKey)
// it works


app.get('/', async (req, res) => {
    let weatherInfo = `https://api.openweathermap.org/data/2.5/weather?q=marina&appid=${apiKey}&units=imperial`
    const response = await fetch(weatherInfo);
    const weatherData = await response.json();
    console.log(weatherData)

    res.render('home.ejs', {weatherData})
 });

 app.get('/current', async (req, res) => {
   let userIn = req.query.userInput;
   let weatherInfo = `https://api.openweathermap.org/data/2.5/weather?q=${userIn}&appid=${apiKey}&units=imperial`;

   try {
       const response = await fetch(weatherInfo);
       const weatherData = await response.json();

       if (weatherData.cod === '404') {
           
           res.render('current.ejs', { errorMessage: "Dude that's not a city, try again.", weatherData: null, userIn});
       } else {
           res.render('current.ejs', {weatherData, userIn, errorMessage: null});
       }
    } catch (error) {
        console.error(error);
        res.render('current.ejs', {
         errorMessage: "Dude that's not a city, try again.", data: null, googleApiKey});
    }
 });


app.get('/forecast', async (req, res) => {
   let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=marina&cnt=5&appid=${apiKey}&units=imperial`;

   try {
       const response = await fetch(forecastUrl);
       const forecastData = await response.json();

       if (forecastData.cod === '404') {
           res.render('forecast.ejs', {errorMessage: "Dude that's not a city, try again.", forecastData: null});
        } else {
            res.render('forecast.ejs', {forecastData,errorMessage: null});
        }
    } catch (error) {
        console.error(error);
        res.render('forecast.ejs', {
         errorMessage: "Dude that's not a city, try again.", data: null, googleApiKey});
    }
 });


app.get('/forecast2', async (req, res) => {
   let userIn = req.query.userInput;
   let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${userIn}&cnt=5&appid=${apiKey}&units=imperial`;

   try {
       const response = await fetch(forecastUrl);
       const forecastData = await response.json();

       if (forecastData.cod === '404') {
           res.render('forecast.ejs', {errorMessage: "Dude that's not a city, try again.", forecastData: null});
       } else {
           res.render('forecast.ejs', {forecastData,errorMessage: null});
       }
    } catch (error) {
        console.error(error);
        res.render('forecast.ejs', {
         errorMessage: "Dude that's not a city, try again.", data: null, googleApiKey});
    }
 });

app.get('/pollution', async (req, res) => {
   let openWeatherApi = `http://api.openweathermap.org/geo/1.0/direct?q=marina,us&limit=1&appid=${apiKey}`;

   try {
       const response2 = await fetch(openWeatherApi);
       const data = await response2.json();

       if (!data || data.length === 0) {
        res.render('pollution.ejs', { errorMessage: "Dude that's not a city, try again.", aqi: null,name: null });
        return;
    }

       let lat = data[0].lat;
       let lon = data[0].lon;
       let name = data[0].name;

       let pollutionUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
       const response = await fetch(pollutionUrl);
       const pollutionData = await response.json();

       if (!pollutionData || !pollutionData.list || pollutionData.list.length === 0) {
        res.render('pollution.ejs', { errorMessage: "Dude that's not a city, try again.", aqi: null, name});
        return;
    }

       let aqi = pollutionData.list[0].main.aqi;
       res.render('pollution.ejs', { aqi, name, errorMessage: null });

    } catch (error) {
        console.error(error);
        res.render('pollution.ejs', {
         errorMessage: "Dude that's not a city, try again.", data: null, googleApiKey});
    }
 });



app.get('/pollution2', async (req, res) => {
   let userIn = req.query.userInput;
   let openWeatherApi = `http://api.openweathermap.org/geo/1.0/direct?q=${userIn}&limit=1&appid=${apiKey}`;

   try {
       const response2 = await fetch(openWeatherApi);
       const data = await response2.json();

       if (!data || data.length === 0) {
           res.render('pollution.ejs', { errorMessage: "Dude that's not a city, try again.", aqi: null,name: null });
           return;
       }

       let lat = data[0].lat;
       let lon = data[0].lon;
       let name = data[0].name;

       let pollutionUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
       const response = await fetch(pollutionUrl);
       const pollutionData = await response.json();

       if (!pollutionData || !pollutionData.list || pollutionData.list.length === 0) {
           res.render('pollution.ejs', { errorMessage: "Dude that's not a city, try again.", aqi: null, name});
           return;
       }

       let aqi = pollutionData.list[0].main.aqi;
       res.render('pollution.ejs', { aqi, name, errorMessage: null });

    } catch (error) {
        console.error(error);
        res.render('pollution.ejs', {
         errorMessage: "Dude that's not a city, try again.", data: null, googleApiKey});
    }
 });


app.get('/coordinates', async (req, res) => {
   let openWeatherApi = `http://api.openweathermap.org/geo/1.0/direct?q=marina,us&limit=1&appid=${apiKey}`;

   try {
       const response = await fetch(openWeatherApi);
       const data = await response.json();

       if (data.length === 0) {
           res.render('coordinates.ejs', {errorMessage: "Dude that's not a city, try again.", data: null, googleApiKey});
       } else {
           res.render('coordinates.ejs', {data, googleApiKey, errorMessage: null });
       }
    } catch (error) {
        console.error(error);
        res.render('coordinates.ejs', {
         errorMessage: "Dude that's not a city, try again.", data: null, googleApiKey});
    }
 });

app.get('/coordinates2', async (req, res) => {
   let userIn = req.query.userInput;
   let openWeatherApi = `http://api.openweathermap.org/geo/1.0/direct?q=${userIn}&limit=1&appid=${apiKey}`;

   try {
       const response = await fetch(openWeatherApi);
       const data = await response.json();

       if (!data || data.length === 0) {
           
           res.render('coordinates.ejs', {
               errorMessage: "Dude that's not a city, try again.", data: null, googleApiKey});
       } else {
           res.render('coordinates.ejs', {data, googleApiKey, errorMessage: null});
       }
   } catch (error) {
       console.error(error);
       res.render('coordinates.ejs', {
        errorMessage: "Dude that's not a city, try again.", data: null, googleApiKey});
   }
});



app.listen(10009, () => {
   console.log('server started');
});
