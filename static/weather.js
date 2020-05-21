//Global variables
const WEATHER_API_KEY = "cff11be67c426dc8ddb0c16b7561b3c1";
const WEATHER_URL = "http://api.openweathermap.org/data/2.5/forecast?";
const tempElement = document.querySelector("#BigTemperature");
const tempElement1 = document.querySelector("#Temperature1");
const tempElement2 = document.querySelector("#Temperature2");
const tempElement3 = document.querySelector("#Temperature3");
const tempElement4 = document.querySelector("#Temperature4");
const iconElement  = document.querySelector("#BigIcon");
const iconElement1  = document.querySelector("#Icon1");
const iconElement2  = document.querySelector("#Icon2");
const iconElement3  = document.querySelector("#Icon3");
const iconElement4  = document.querySelector("#Icon4");
const tempElementCity = document.querySelector("#City");
const tempElementDay2 = document.querySelector("#Day2");
const tempElementDay3 = document.querySelector("#Day3");
const tempElementDay4 = document.querySelector("#Day4");
const tempElementDay5 = document.querySelector("#Day5");



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
    console.log(weatherData.list[0].dt_txt);
}


/** Takes cityname from API response and splits it into one word (to avoid "municipality") and then inserts it into the HTML */
function city(weatherData) {
    const CityName = (weatherData.city.name);
    const Split = CityName.split(" ", 1);
    tempElementCity.innerHTML = `${(Split)}`;
}


/** Takes date from API response and translates to swedish then inserts it into the HTML */
function dates(weatherData) {

    /** Code for tomorrow */
    const day2 = new Date(weatherData.list[8].dt_txt);
    const datetostring2 = day2.toString()
    const weekday2 = datetostring2.split(" ", 1);

    if (weekday2 == "Mon") {
        tempElementDay2.innerHTML = `${("Måndag")}`
        
    } else if (weekday2 == "Tue") {
        tempElementDay2.innerHTML = `${("Tisdag")}`

    } else if (weekday2 == "Wed") {
        tempElementDay2.innerHTML = `${("Onsdag")}`

    } else if (weekday2 == "Thu") {
        tempElementDay2.innerHTML = `${("Torsdag")}`

    } else if (weekday2 == "Fri") {
        tempElementDay2.innerHTML = `${("Fredag")}`

    } else if (weekday2 == "Sat") {
        tempElementDay2.innerHTML = `${("Lördag")}`

    } else if (weekday2 == "Sun") {
        tempElementDay2.innerHTML = `${("Söndag")}`

    }

    /** Code for overmorrow */
    const day3 = new Date(weatherData.list[16].dt_txt);
    const datetostring3 = day3.toString()
    const weekday3 = datetostring3.split(" ", 1);

    if (weekday3 == "Mon") {
        tempElementDay3.innerHTML = `${("Måndag")}`
        
    } else if (weekday3 == "Tue") {
        tempElementDay3.innerHTML = `${("Tisdag")}`

    } else if (weekday3 == "Wed") {
        tempElementDay3.innerHTML = `${("Onsdag")}`

    } else if (weekday3 == "Thu") {
        tempElementDay3.innerHTML = `${("Torsdag")}`

    } else if (weekday3 == "Fri") {
        tempElementDay3.innerHTML = `${("Fredag")}`

    } else if (weekday3 == "Sat") {
        tempElementDay3.innerHTML = `${("Lördag")}`

    } else if (weekday3 == "Sun") {
        tempElementDay3.innerHTML = `${("Söndag")}`

    }

    /** Code for day after overmorrow */
    const day4 = new Date(weatherData.list[24].dt_txt);
    const datetostring4 = day4.toString()
    const weekday4 = datetostring4.split(" ", 1);

    if (weekday4 == "Mon") {
        tempElementDay4.innerHTML = `${("Måndag")}`
        
    } else if (weekday4 == "Tue") {
        tempElementDay4.innerHTML = `${("Tisdag")}`

    } else if (weekday4 == "Wed") {
        tempElementDay4.innerHTML = `${("Onsdag")}`

    } else if (weekday4 == "Thu") {
        tempElementDay4.innerHTML = `${("Torsdag")}`

    } else if (weekday4 == "Fri") {
        tempElementDay4.innerHTML = `${("Fredag")}`

    } else if (weekday4 == "Sat") {
        tempElementDay4.innerHTML = `${("Lördag")}`

    } else if (weekday4 == "Sun") {
        tempElementDay4.innerHTML = `${("Söndag")}`

    }

    /** Code for day efter day-after-overmorrow */
    const day5 = new Date(weatherData.list[32].dt_txt);
    const datetostring5 = day5.toString()
    const weekday5 = datetostring5.split(" ", 1);

    if (weekday5 == "Mon") {
        tempElementDay5.innerHTML = `${("Måndag")}`

    } else if (weekday5 == "Tue") {
        tempElementDay5.innerHTML = `${("Tisdag")}`

    } else if (weekday5 == "Wed") {
        tempElementDay5.innerHTML = `${("Onsdag")}`

    } else if (weekday5 == "Thu") {
        tempElementDay5.innerHTML = `${("Torsdag")}`

    } else if (weekday5 == "Fri") {
        tempElementDay5.innerHTML = `${("Fredag")}`

    } else if (weekday5 == "Sat") {
        tempElementDay5.innerHTML = `${("Lördag")}`

    } else if (weekday5 == "Sun") {
        tempElementDay5.innerHTML = `${("Söndag")}`

    }

}


/** Takes the temperature from the API and inserts the converted value(K->C) into the HTML */
function displayWeather(weatherData) {
    tempElement.innerHTML = `${(Math.round(weatherData.list[0].main.temp - 273.15))}°`;
    tempElement1.innerHTML = `${(Math.round(weatherData.list[8].main.temp - 273.15))}°`;
    tempElement2.innerHTML = `${(Math.round(weatherData.list[16].main.temp - 273.15))}°`;
    tempElement3.innerHTML = `${(Math.round(weatherData.list[24].main.temp - 273.15))}°`;
    tempElement4.innerHTML = `${(Math.round(weatherData.list[32].main.temp - 273.15))}°`;


    /** Chooses the icon depending on the API response and then inserts it into the HTML */
    /** Icons for today */
    if (weatherData.list[0].weather[0].main == "Rain" || weatherData.list[0].weather[0].main == "Drizzle") {
        iconElement.src = "/static/icons/Rain128.png"

    }   else if (weatherData.list[0].weather[0].main == "Thunderstorm") {
        iconElement.src ="/static/icons/Thunderstorm128.png"

    }   else if (weatherData.list[0].weather[0].main == "Snow") {
        iconElement.src ="/static/icons/Snow128.png"

    }   else if (weatherData.list[0].weather[0].main == "Clear") {
        iconElement.src ="/static/icons/Clear128.png"

    }   else if (weatherData.list[0].weather[0].main == "Clouds") {
        iconElement.src ="/static/icons/Clouds128.png"

    }   else if (weatherData.list[0].weather[0].main == "Mist" || weatherData.list[0].weather[0].main == "Smoke" || weatherData.list[0].weather[0].main == "Haze" || weatherData.list[0].weather[0].main == "Dust" || weatherData.list[0].weather[0].main == "Fog" || weatherData.list[0].weather[0].main == "Sand" || weatherData.list[0].weather[0].main == "Ash" || weatherData.list[0].weather[0].main == "Squall" || weatherData.list[0].weather[0].main == "Tornado") {
        iconElement.src ="/static/icons/Atmosphere128.png"
    }        


    /** Icons for tomorrow*/
    if (weatherData.list[8].weather[0].main == "Rain" || weatherData.list[8].weather[0].main == "Drizzle") {
        iconElement1.src = "/static/icons/Rain32.png"

    }   else if (weatherData.list[8].weather[0].main == "Thunderstorm") {
        iconElement1.src ="/static/icons/Thunderstorm32.png"

    }   else if (weatherData.list[8].weather[0].main == "Snow") {
        iconElement1.src ="/static/icons/Snow32.png"

    }   else if (weatherData.list[8].weather[0].main == "Clear") {
        iconElement1.src ="/static/icons/Clear32.png"

    }   else if (weatherData.list[8].weather[0].main == "Clouds") {
        iconElement1.src ="/static/icons/Clouds32.png"

    }   else if (weatherData.list[8].weather[0].main == "Mist" || weatherData.list[8].weather[0].main == "Smoke" || weatherData.list[8].weather[0].main == "Haze" || weatherData.list[8].weather[0].main == "Dust" || weatherData.list[8].weather[0].main == "Fog" || weatherData.list[8].weather[0].main == "Sand" || weatherData.list[8].weather[0].main == "Ash" || weatherData.list[8].weather[0].main == "Squall" || weatherData.list[8].weather[0].main == "Tornado") {
        iconElement1.src ="/static/icons/Atmosphere32.png"
    }


    /** Icons for overmorrow */
    if (weatherData.list[16].weather[0].main == "Rain" || weatherData.list[16].weather[0].main == "Drizzle") {
        iconElement2.src = "/static/icons/Rain32.png"

    }   else if (weatherData.list[16].weather[0].main == "Thunderstorm") {
        iconElement2.src ="/static/icons/Thunderstorm32.png"

    }   else if (weatherData.list[16].weather[0].main == "Snow") {
        iconElement2.src ="/static/icons/Snow32.png"

    }   else if (weatherData.list[16].weather[0].main == "Clear") {
        iconElement2.src ="/static/icons/Clear32.png"

    }   else if (weatherData.list[16].weather[0].main == "Clouds") {
        iconElement2.src ="/static/icons/Clouds32.png"

    }   else if (weatherData.list[16].weather[0].main == "Mist" || weatherData.list[16].weather[0].main == "Smoke" || weatherData.list[16].weather[0].main == "Haze" || weatherData.list[16].weather[0].main == "Dust" || weatherData.list[16].weather[0].main == "Fog" || weatherData.list[16].weather[0].main == "Sand" || weatherData.list[16].weather[0].main == "Ash" || weatherData.list[16].weather[0].main == "Squall" || weatherData.list[16].weather[0].main == "Tornado") {
        iconElement2.src ="/static/icons/Atmosphere32.png"
    }


    /** Icons for the day after overmorrow  */
    if (weatherData.list[24].weather[0].main == "Rain" || weatherData.list[24].weather[0].main == "Drizzle") {
        iconElement3.src = "/static/icons/Rain32.png"

    }   else if (weatherData.list[24].weather[0].main == "Thunderstorm") {
        iconElement3.src ="/static/icons/Thunderstorm32.png"

    }   else if (weatherData.list[24].weather[0].main == "Snow") {
        iconElement3.src ="/static/icons/Snow32.png"

    }   else if (weatherData.list[24].weather[0].main == "Clear") {
        iconElement3.src ="/static/icons/Clear32.png"

    }   else if (weatherData.list[24].weather[0].main == "Clouds") {
        iconElement3.src ="/static/icons/Clouds32.png"

    }   else if (weatherData.list[24].weather[0].main == "Mist" || weatherData.list[24].weather[0].main == "Smoke" || weatherData.list[24].weather[0].main == "Haze" || weatherData.list[24].weather[0].main == "Dust" || weatherData.list[24].weather[0].main == "Fog" || weatherData.list[24].weather[0].main == "Sand" || weatherData.list[24].weather[0].main == "Ash" || weatherData.list[24].weather[0].main == "Squall" || weatherData.list[24].weather[0].main == "Tornado") {
        iconElement3.src ="/static/icons/Atmosphere32.png"
    }


    //**Icons for two days after overmorrow */
    if (weatherData.list[32].weather[0].main == "Rain" || weatherData.list[32].weather[0].main == "Drizzle") {
        iconElement4.src = "/static/icons/Rain32.png"

    }   else if (weatherData.list[32].weather[0].main == "Thunderstorm") {
        iconElement4.src ="/static/icons/Thunderstorm32.png"

    }   else if (weatherData.list[32].weather[0].main == "Snow") {
        iconElement4.src ="/static/icons/Snow32.png"

    }   else if (weatherData.list[32].weather[0].main == "Clear") {
        iconElement4.src ="/static/icons/Clear32.png"

    }   else if (weatherData.list[32].weather[0].main == "Clouds") {
        iconElement4.src ="/static/icons/Clouds32.png"

    }   else if (weatherData.list[32].weather[0].main == "Mist" || weatherData.list[32].weather[0].main == "Smoke" || weatherData.list[32].weather[0].main == "Haze" || weatherData.list[32].weather[0].main == "Dust" || weatherData.list[32].weather[0].main == "Fog" || weatherData.list[32].weather[0].main == "Sand" || weatherData.list[32].weather[0].main == "Ash" || weatherData.list[32].weather[0].main == "Squall" || weatherData.list[32].weather[0].main == "Tornado") {
        iconElement4.src ="/static/icons/Atmosphere32.png"
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
            city(weatherData);
            dates(weatherData);
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