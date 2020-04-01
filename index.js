require("dotenv").config();
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");



const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html");
    
});

app.post("/", function(req,res){
    const query = req.body.cityName;
    const appid = process.env.APP_ID;
    const unit ="metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ appid+"&units="+ unit;

    https.get(url, function(response) {
        console.log(response.statusCode); 

        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDiscription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            
            res.send("<h2>Temprature in "+ query +" is : " + temp + " degree Celcius</h2><br><h3>Weather is "+ weatherDiscription + " </h3><br><img src=" + imageURL + ">");
        });
        
    });
    
});




app.listen(3000, function(res, res) {
    console.log("server is running on : 3000");
    
});