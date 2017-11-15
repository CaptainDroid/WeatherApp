const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
   res.render('index', {error: null, weather: null});
   console.log('Inside get request');
});

app.post('/', function(req, res) {
    var city = req.body.City;
    var country = req.body.Country;
    if(country != '') {
        country = ','+country;
        console.log(country);
    }
    var API_KEY = 'db5242beb8806f20cb183adcf42947d2';
    var url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}${country}&APPID=${API_KEY}&units=metric`;
    console.log(url);
    //console.log("Inside post request");
    var request = require('request');
    request(url, function(err, response, body) {
        console.log(body);
        if(err) {
            res.render('index', {weather:null, error: 'Error! Please try again.'});
        } else {
            var weatherData = JSON.parse(body);
            console.log(weatherData);
            console.log(weatherData.list);
            if(weatherData.list == undefined) {
                res.render('index', { weather: null, error : 'Not a valid City name or Country code!'});
            } else {
                var temperature = `It's ${weatherData.list[0].main['temp']} degrees Celsius in ${city}${country}!`;
                var maxTemperature = `The maximum temperature of the day is ${weatherData.list[0].main['temp_max']} degrees Celsius.`;
                var minTemperature = `The minimum temperature of the day is ${weatherData.list[0].main['temp_min']} degrees Celsius.`;
                var weather = `Status : ${weatherData.list[0].weather[0].main}.`;
                var weatherDescription = `Description : ${weatherData.list[0].weather[0].description}.`;
                res.render('index', {temperature : temperature, maxTemperature : maxTemperature, minTemperature : minTemperature, weather : weather, weatherDescription : weatherDescription, error : null});
            
            }
        }
    });
});



port = 3000;
app.listen(port, function() {
    console.log("Server started on port "+port);
});