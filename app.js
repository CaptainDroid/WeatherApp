http = require('http');

//Search by City ID. (Get city id on OpenWeatherMap.com)
//url = 'http://api.openweathermap.org/data/2.5/forecast?id=1264527&APPID=db5242beb8806f20cb183adcf42947d2&units=metric'

//Search by City Name, Country code
url = 'http://api.openweathermap.org/data/2.5/forecast?q=Lucknow,IN&APPID=db5242beb8806f20cb183adcf42947d2&units=metric'
var server = http.createServer(function(request, response) {
    var request = require('request');
    request(url, function(err, res, body) {
        var result='';
        
        if(res.statusCode == 200) {
            console.log("Getting Weather Data...");
            /*res.on('data', function(chunk){
                result+=chunk;
            })
            res.on('end', function(){
                var weatherData = JSON.parse(result);
                console.log(weatherData);
            })*/
            console.log(body);
            var weatherData = JSON.parse(body);
          //  console.log("This is the weather data");
          //  console.log(weatherData);
          response.writeHead(200,{"Content-Type" : "text/html"});
          response.write("<html><body>");
            response.write("<h1>Weather Information for Chennai </h1><h2>Temperature is : "+weatherData.list[0].main['temp']+"</h2>");
            response.write("<h2>Maximum temperature is : "+weatherData.list[0].main['temp_max']+"</h2>")
            response.write("<h2>Minimum temperature is : "+weatherData.list[0].main['temp_min']+"</h2>")
            response.write("<h2>Weather summary is : "+weatherData.list[0].weather[0].main+"</h2>")
            response.write("<h2>Weather description is : "+weatherData.list[0].weather[0].description+"</h2>")
            response.write("</body></html>")
            response.end();
        }
    });
}).listen(8001);