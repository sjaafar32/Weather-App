const input = document.querySelector('input');
const searchButton = document.getElementById('search-button');
const celsiusButton = document.getElementById('celsius-button');
const farenheitButton = document.getElementById('farenheit-button');
const fiveDayForecast = document.getElementById('five-day-forecast');

const cityName = document.getElementById('city-name');
const currentWeatherImage = document.getElementById('current-weather-image');
const tempAndDescription = document.getElementById('temp-description');

const feelsLikeTemp = document.getElementById('feels-like-temp');
const windSpeed = document.getElementById('wind-speed');
const humidity = document.getElementById('humidity');

let weatherData;
let fiveDayData;
let country;

async function getWeatherData(cityNameInput, unitSystem, tempUnit, speedUnit) {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityNameInput + '&APPID=b39b9d581bd43650a4e390d75360effb&units=' + unitSystem, {mode: 'cors'});

    weatherData = await response.json();
    console.log(weatherData);

    const fiveDayResponse = await fetch('https://api.openweathermap.org/data/3.0/onecall?lat=' + weatherData.coord.lat + '&lon=' + weatherData.coord.lon + '&exclude=current,minutely,hourly,alerts&appid=b39b9d581bd43650a4e390d75360effb&units=' + unitSystem, {mode: 'cors'});

    fiveDayData = await fiveDayResponse.json();
    console.log(fiveDayData);
    forecastCard(fiveDayData, unitSystem.toString());

    feelsLikeTemp.innerText = 'Feels Like \n' + weatherData.main.feels_like.toFixed(0) + tempUnit;
    windSpeed.innerText = 'Wind Speed \n' + weatherData.wind.speed.toFixed(0) + speedUnit;
    humidity.innerText = 'Humidity \n' + weatherData.main.humidity + "%";

    country = weatherData.sys.country;

    cityName.innerHTML = cityNameInput + ', ' + country;
    tempAndDescription.innerText = weatherData.main.temp.toFixed(0) + tempUnit + '\n' + weatherData.weather[0].main;
    currentWeatherImage.src = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@4x.png" ;
}



searchButton.addEventListener('click', () => {
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




function forecastCard(fiveDayData, unitSystem) {
    reset();
    if(unitSystem == 'imperial'){ unitSystem = ' °F';} 
    else {unitSystem = ' °C';}
    for(let i=0; i<5; i++){
        const futureDayCard = document.createElement('div');

        if(i == 4){ futureDayCard.style.setProperty('border-right-style', 'none'); }
        else { futureDayCard.style.setProperty('border-right-style', 'solid'); }
        

        const weatherImg = document.createElement('img');
        const lowHighTemp = document.createElement('div');
        const dayOfWeek = document.createElement('div');
        const rainImg = document.createElement('img');
        const chanceOfRain = document.createElement('div');
        
        dayOfWeek.innerText = getDay(fiveDayData.daily[i+1].dt);

        weatherImg.style.setProperty('margin-left', '12px');

        weatherImg.src = "http://openweathermap.org/img/wn/" + fiveDayData.daily[i].weather[0].icon + "@2x.png" 
        lowHighTemp.innerText = 'High | Low \n' + fiveDayData.daily[i].temp.max.toFixed(0) + ' | ' + fiveDayData.daily[i].temp.min.toFixed(0) + unitSystem;
        
        rainImg.src = "./Icons/Rain.png";
        rainImg.style.setProperty('height', '25px');
        rainImg.style.setProperty('margin', '5px 10px 0px 0px');
        chanceOfRain.style.setProperty('font-size', '25px');

        
        chanceOfRain.appendChild(rainImg);
        chanceOfRain.innerHTML += (fiveDayData.daily[i].pop * 100).toFixed(0) + '%';
        chanceOfRain.style.setProperty('text-align', 'center');

        futureDayCard.classList.add('future-day-card');
        futureDayCard.appendChild(dayOfWeek);
        futureDayCard.appendChild(weatherImg);
        futureDayCard.appendChild(lowHighTemp);
        futureDayCard.appendChild(chanceOfRain);

        fiveDayForecast.appendChild(futureDayCard);
    }
}

function reset(){
    const forecastArray = Array.from(fiveDayForecast.childNodes);
    forecastArray.forEach((element) => {
        fiveDayForecast.removeChild(element);
    });
}


function getDay(timestamp) {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const date = new Date(timestamp * 1000);
    return weekday[date.getDay()];
}