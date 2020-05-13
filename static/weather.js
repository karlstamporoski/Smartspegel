const WEATHER_API_KEY = "cff11be67c426dc8ddb0c16b7561b3c1";
const WEATHER_URL = "http://api.openweathermap.org/data/2.5/forecast?";

function getCoordinates(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    fetchWeatherData(latitude, longitude);
}

function error() {
    console.log("Unable to fetch your position");
}

function displayWeather(weatherData) {
    console.log("Recieve this weather data");
    console.log(weatherData);
    console.log(weatherData.city.name);
}

function fetchWeatherData(latitude, longitude) {
    const url = `${WEATHER_URL}lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`;

    fetch(url)
        .then(function(response) {
            const weatherData = response.json();
            return weatherData;
        })
        .then(function(weatherData) {
            displayWeather(weatherData);
        })
        .catch(function(){
            console.log("Unable to fetch weather data");
        });
}

function initializeWeatherWidget() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            getCoordinates, error
        );
    }
}

window.addEventListener("load", initializeWeatherWidget);