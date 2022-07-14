const input = document.querySelector('input');
const enterButton = document.getElementById('enter-button');
const celsiusButton = document.getElementById('celsius-button');
const farenheitButton = document.getElementById('farenheit-button');

const cityName = document.getElementById('city-name');
const currentWeatherImage = document.getElementById('current-weather-image');
const tempAndDescription = document.getElementById('temp-description');

const feelsLikeTemp = document.getElementById('feels-like-temp');
const windSpeed = document.getElementById('wind-speed');
const humidity = document.getElementById('humidity');

let weatherData;
let country;

async function getWeatherData(cityNameInput, unitSystem, tempUnit, speedUnit) {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityNameInput + '&APPID=b39b9d581bd43650a4e390d75360effb&units=' + unitSystem, {mode: 'cors'});

    weatherData = await response.json();
    console.log(weatherData);

    feelsLikeTemp.innerText = 'Feels Like \n' + weatherData.main.feels_like.toFixed(0) + tempUnit;
    windSpeed.innerText = 'Wind Speed \n' + weatherData.wind.speed.toFixed(0) + speedUnit;
    humidity.innerText = 'Humidity \n' + weatherData.main.humidity + "%";

    country = weatherData.sys.country;

    cityName.innerHTML = cityNameInput + ', ' + country;
    tempAndDescription.innerText = weatherData.main.temp.toFixed(0) + tempUnit + '\n' + weatherData.weather[0].main;
    currentWeatherImage.src = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@4x.png" ;
}


enterButton.addEventListener('click', () => {
    getWeatherData(input.value, 'imperial', ' °F', ' mph').catch(function(error) {
        alert('Could not retrieve data');
    });
    farenheitButton.style.setProperty('text-decoration', 'underline');
    celsiusButton.style.setProperty('text-decoration', 'none');
});

farenheitButton.addEventListener('click', () => {
    let cityName = input.value;
    if(input.value == ''){ cityName = 'New York';}
    getWeatherData(cityName, 'imperial', ' °F', ' mph').catch(function(error) {
        alert('Could not retreive data');
    });
    farenheitButton.style.setProperty('text-decoration', 'underline');
    celsiusButton.style.setProperty('text-decoration', 'none');
})

celsiusButton.addEventListener('click', () => {
    let cityName = input.value;
    if(input.value == ''){ cityName = 'New York';}
    getWeatherData(cityName, 'metric', ' °C', ' m/s').catch(function(error) {
        alert('Could not retrieve data');
    });
    farenheitButton.style.setProperty('text-decoration', 'none');
    celsiusButton.style.setProperty('text-decoration', 'underline');
});

window.onload = function(){
    getWeatherData('New York', 'imperial', ' °F', ' mph').catch(function(error) {
        alert('Could not retrieve data');
    });
    farenheitButton.style.setProperty('text-decoration', 'underline');
    celsiusButton.style.setProperty('text-decoration', 'none');
}
