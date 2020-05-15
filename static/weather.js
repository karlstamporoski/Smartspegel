//Global variables
const WEATHER_API_KEY = "cff11be67c426dc8ddb0c16b7561b3c1";
const WEATHER_URL = "http://api.openweathermap.org/data/2.5/forecast?";
const tempElement = document.querySelector("#BigTemperature");
const tempElement1 = document.querySelector("#Temperature1");
const tempElement2 = document.querySelector("#Temperature2");
const tempElement3 = document.querySelector("#Temperature3");
const tempElement4 = document.querySelector("#Temperature4");
const iconElement  = document.querySelector("#BigIcon");



/** Gets the coordiantes from the user in the form of longitude and latitude */
function getCoordinates(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    fetchWeatherData(latitude, longitude);
}


/**This is an error function for when the user-position is unable to be fetched*/
function error() {
    console.log("Unable to fetch your position");
}


/** Prints information in the console */
function consoleDisplayWeather(weatherData) {
    console.log("Received this weather data");
    console.log(weatherData);
    console.log(weatherData.city.name);
    console.log(Math.round(weatherData.list[0].main.temp - 273));
    console.log(weatherData.list[0].weather[0].main);
}

function displayWeather(weatherData) {
    tempElement.innerHTML = `${(Math.round(weatherData.list[0].main.temp - 273.15))}°`;
    tempElement1.innerHTML = `${(Math.round(weatherData.list[8].main.temp - 273.15))}°`;
    tempElement2.innerHTML = `${(Math.round(weatherData.list[16].main.temp - 273.15))}°`;
    tempElement3.innerHTML = `${(Math.round(weatherData.list[24].main.temp - 273.15))}°`;
    tempElement4.innerHTML = `${(Math.round(weatherData.list[32].main.temp - 273.15))}°`;

    if (weatherData.list[0].weather[0].main == "Rain") {
        iconElement.src = "/static/cloudy128.png"
    }
}

/** Grabs the latitude/lognitude and the API key and inserts it into the aforementionened url*/
function fetchWeatherData(latitude, longitude) {
    const url = `${WEATHER_URL}lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`;

    /** Fetches the information from the new url returns it in json.  */
    fetch(url)
        .then(function(response) {
            const weatherData = response.json();
            return weatherData;
        })
        .then(function(weatherData) {
            displayWeather(weatherData);
            consoleDisplayWeather(weatherData);
        })
        .catch(function(){
            console.log("Unable to fetch weather data");
        });
}


/** If the user's browser has geolocation, the coordinates get fetched. Otherwise an error function runs */
function initializeWeatherWidget() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            getCoordinates, error
        );
    }
}


// When site is loaded, the "intializeWeatherWidget" function runs.
window.addEventListener("load", initializeWeatherWidget);