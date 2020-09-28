document.getElementById("display_weather").addEventListener("click", () => {
    refreshForecast();  
    displayCurrentWeather();  
});

document.getElementById("display_forecast").addEventListener("click", () => {
    loadForecast();
    displayForecastWeather();
});

var cityName = document.getElementById("city").value;
var CurrentWeather = [];
var ForecastWeather = [];

function displayCurrentWeather() {
    var cityName = document.getElementById("city").value;
    var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=" + cityName + "");//definim ce sa faca requestul, nu nitiaza cererea, are 2 param: metoda(get) si url-ul (cu /spre fisier);REST-interactiune cu o resursa
    xhttp.send();
    xhttp.onload = function () {
        if (this.status === 200) {
            updateCurrentWeather(this.responseText);
            AddCurrentWeather();
            CurrentWeather = [];
            ForecastWeather = [];
        }
    }
}

function AddCurrentWeather() {
    document.getElementById("description").innerHTML = "Description: " + CurrentWeather["weather"][0]["description"];
    document.getElementById("humidity").innerHTML = "Humidity: " + CurrentWeather["main"].humidity+"%";
    document.getElementById("pression").innerHTML = "Pression: " + CurrentWeather["main"].pressure;
    document.getElementById("current_temp").innerHTML = "Current temperature: " + CurrentWeather["main"].temp;
    document.getElementById("minimum").innerHTML = "Minimum temp: " + CurrentWeather["main"].temp_min;
    document.getElementById("maximum").innerHTML = "Maximum temp: " + CurrentWeather["main"].temp_max;
    document.getElementById("weather_icon").innerHTML = "<img src=http://openweathermap.org/img/w/" + CurrentWeather["weather"][0]["icon"] + ".png>";
}

function updateCurrentWeather(response) {
    CurrentWeather = JSON.parse(response);
}

function displayForecastWeather() {
    var cityName = document.getElementById("city").value;
    var xhttp = new XMLHttpRequest(); 
        xhttp.open("GET", "https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=" + cityName + "");//definim ce sa faca requestul, nu nitiaza cererea, are 2 param: metoda(get) si url-ul (cu /spre fisier);REST-interactiune cu o resursa
    xhttp.send(); 
    xhttp.onload = function () {
        if (this.status === 200) {    
            ForecastWeather = [];
            updateForecastWeather(this.responseText);  
        }
    }
}

function updateForecastWeather(response) {
    ForecastWeather = JSON.parse(response);
    var ForecastListData = ForecastWeather["list"];
    for (var i = 0; i < ForecastListData.length; i++) {
        var fullDate = ForecastWeather["list"][i]["dt_txt"];
        var hour = fullDate.slice(11, 16);
        var date = fullDate.slice(0, 10);
        ForecastListData[i].currentDate = date;
        ForecastListData[i].currentHour = hour;
    }
    splitForecastListDataByDay();
}
var forecastData = [];  

function splitForecastListDataByDay() {
    var i = 0;
    var j = i + 1;
    var ForecastListData = ForecastWeather["list"];

    for (i = 0; i < ForecastListData.length; i++) {
        index1 = 0;
        index2 = 0;
        for (i = 0; i < ForecastListData.length; i++) {
            if (ForecastListData[i]["currentDate"] == ForecastListData[0]["currentDate"]) {
                index1 += 1;
                var day1 = ForecastListData.slice(0, index1);
                index2 = index1 + 1;
            }
        }
        
        for (j = index1 + 1; j < ForecastListData.length; j++) {
            if (ForecastListData[j]["currentDate"] == ForecastListData[index1 + 1]["currentDate"]) {
                index2 += 1;
                var day2 = ForecastListData.slice(index1, index2);
                index3 = index2 + 1
            }
        }
        
        for (k = index2 + 1; k < ForecastListData.length; k++) {
            if (ForecastListData[k]["currentDate"] == ForecastListData[index2 + 1]["currentDate"]) {
                index3 += 1;
                var day3 = ForecastListData.slice(index2, index3);
                index4 = index3 + 1
            }
        }
        for (l = index4; l < ForecastListData.length; l++) {
            if (ForecastListData[l]["currentDate"] == ForecastListData[index3 + 1]["currentDate"]) {
                index4 += 1;
                var day4 = ForecastListData.slice(index3, index4);
                index5 = index4 + 1
            }
        }
        for (m = index5; m < ForecastListData.length; m++) {
            if (ForecastListData[m]["currentDate"] == ForecastListData[index4 + 1]["currentDate"]) {
                index5 += 1;
                var day5 = ForecastListData.slice(index4, index5);
                index6 = index5 + 1
            }
        }
        for (n = index6; n < ForecastListData.length; n++) {
            if (ForecastListData[n]["currentDate"] == ForecastListData[index5 + 1]["currentDate"]) {
                index6 += 1;
                var day6 = ForecastListData.slice(index5, index6);
            }
        }
    }
    document.getElementById("day1_date").innerHTML = "Day: " + day1[0]["currentDate"];
    document.getElementById("day2_date").innerHTML = "Day: " + day2[0]["currentDate"];
    document.getElementById("day3_date").innerHTML = "Day: " + day3[0]["currentDate"];
    document.getElementById("day4_date").innerHTML = "Day: " + day4[0]["currentDate"];
    document.getElementById("day5_date").innerHTML = "Day: " + day5[0]["currentDate"];
    document.getElementById("day6_date").innerHTML = "Day: " + day6[0]["currentDate"];
    var i
    for (i = 0; i < day1.length; i++) {
        document.getElementById("day1_1").innerHTML += "<br>" + "<img src=http://openweathermap.org/img/w/" + day1[i]["weather"][0]["icon"] + ".png>" + "<br>" + "Hour: " + day1[i]["currentHour"] + "<br>" + "Temperature: " + day1[i]["main"]["temp"] + "<br>" + "Description: " + day1[i]["weather"][0]["description"];
    }
    for (i = 0; i < day2.length; i++) {
        document.getElementById("day2_1").innerHTML += "<br>" + "<img src=http://openweathermap.org/img/w/" + day2[i]["weather"][0]["icon"] + ".png>" + "<br>" + "Hour: " + day2[i]["currentHour"] + "<br>" + "Temperature: " + day2[i]["main"]["temp"] + "<br>" + "Description: " + day2[i]["weather"][0]["description"];
    }
    for (i = 0; i < day3.length; i++) {
        document.getElementById("day3_1").innerHTML += "<br>" + "<img src=http://openweathermap.org/img/w/" + day3[i]["weather"][0]["icon"] + ".png>" + "<br>" + "Hour: " + day3[i]["currentHour"] + "<br>" + "Temperature: " + day3[i]["main"]["temp"] + "<br>" + "Description: " + day3[i]["weather"][0]["description"];
    }
    for (i = 0; i < day4.length; i++) {
        document.getElementById("day4_1").innerHTML += "<br>" + "<img src=http://openweathermap.org/img/w/" + day4[i]["weather"][0]["icon"] + ".png>" + "<br>" + "Hour: " + day4[i]["currentHour"] + "<br>" + "Temperature: " + day4[i]["main"]["temp"] + "<br>" + "Description: " + day4[i]["weather"][0]["description"];
    }
    for (i = 0; i < day5.length; i++) {
        document.getElementById("day5_1").innerHTML += "<br>" + "<img src=http://openweathermap.org/img/w/" + day5[i]["weather"][0]["icon"] + ".png>" + "<br>" + "Hour: " + day5[i]["currentHour"] + "<br>" + "Temperature: " + day5[i]["main"]["temp"] + "<br>" + "Description: " + day5[i]["weather"][0]["description"];
    }
    for (i = 0; i < day6.length; i++) {
        document.getElementById("day6_1").innerHTML += "<br>" + "<img src=http://openweathermap.org/img/w/" + day6[i]["weather"][0]["icon"] + ".png>" + "<br>" + "Hour: " + day6[i]["currentHour"] + "<br>" + "Temperature: " + day6[i]["main"]["temp"] + "<br>" + "Description: " + day6[i]["weather"][0]["description"];
    }
}
function refreshForecast(){
    document.getElementById("day1_1").innerHTML = "";
    document.getElementById("day2_1").innerHTML = "";
    document.getElementById("day3_1").innerHTML = "";
    document.getElementById("day4_1").innerHTML = "";
    document.getElementById("day5_1").innerHTML = "";
    document.getElementById("day6_1").innerHTML = "";
    document.getElementById("forecast").style.display="none";
}
function loadForecast(){
    document.getElementById("forecast").style.display="block";
}