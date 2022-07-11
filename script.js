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

async function getWeatherData(cityNameInput, unitSystem, tempUnit, speedUnit) {
    const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=' + cityNameInput + '&APPID=b39b9d581bd43650a4e390d75360effb&units=' + unitSystem, {mode: 'cors'});

    weatherData = await response.json();
    console.log(weatherData);
    console.log(weatherData.main.temp);

    feelsLikeTemp.innerHTML = 'Feels Like \n' + weatherData.main.feels_like.toFixed(0) + tempUnit;
    windSpeed.innerHTML = 'Wind Speed \n' + weatherData.wind.speed.toFixed(0) + speedUnit;
    humidity.innerHTML = 'Humidity \n' + weatherData.main.humidity + "%";

    cityName.innerHTML = cityNameInput;
    tempAndDescription.innerText = weatherData.main.temp.toFixed(0) + tempUnit + '\n' + weatherData.weather[0].main;

}


enterButton.addEventListener('click', () => {
    getWeatherData(input.value, 'imperial', ' °F', ' mph').catch(function(error) {
        console.log('Could not retrieve data');
    });
    farenheitButton.style.setProperty('text-decoration', 'underline');
    celsiusButton.style.setProperty('text-decoration', 'none');
});

farenheitButton.addEventListener('click', () => {
    getWeatherData(input.value, 'imperial', ' °F', ' mph').catch(function(error) {
        console.log('Could not retreive data');
    });
    farenheitButton.style.setProperty('text-decoration', 'underline');
    celsiusButton.style.setProperty('text-decoration', 'none');
})

celsiusButton.addEventListener('click', () => {
    getWeatherData(input.value, 'metric', ' °C', ' m/s').catch(function(error) {
        console.log('Could not retrieve data');
    });
    farenheitButton.style.setProperty('text-decoration', 'none');
    celsiusButton.style.setProperty('text-decoration', 'underline');
});

window.onload = function(){
    getWeatherData('New York', 'imperial', ' °F', ' mph').catch(function(error) {
        console.log('Could not retrieve data');
    });
    farenheitButton.style.setProperty('text-decoration', 'underline');
    celsiusButton.style.setProperty('text-decoration', 'none');
}
