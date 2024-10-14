const apiKey = "19f175c397782f927e89a4261b9f3ac5";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const forecastUrl = "https://api.openweathermap.org/data/3.0/onecall?";
const searchBox = document.querySelector(".searchbox input");
const searchBtn = document.querySelector(".searchbox button");
const weatherIcon = document.querySelector(".weather-icon");
const forecastContainer = document.getElementById("forecast-container");

// Function to fetch and display weather data
async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        searchBox.value = "";
    } else {
        document.querySelector(".error").style.display = "none";
    }
    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " kmph";

    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/sun.png";
    } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
    }

    document.querySelector(".weather").style.display = "block";
    
    // Fetch and display 7-day forecast
    getForecast(data.coord.lat, data.coord.lon);
    searchBox.value = "";
}

// Function to get 7-day forecast data
async function getForecast(lat, lon) {
    const forecastResponse = await fetch(forecastUrl + `lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${apiKey}`);
    const forecastData = await forecastResponse.json();

    forecastContainer.innerHTML = "";  // Clear previous forecast

    // Display next 7 days forecast
    forecastData.daily.slice(1, 8).forEach(day => {
        const dayElement = document.createElement("div");
        dayElement.classList.add("forecast-day");

        const date = new Date(day.dt * 1000);
        const options = { weekday: 'short' };
        const dayName = date.toLocaleDateString('en-US', options);

        let weatherIcon = "images/clouds.png";
        if (day.weather[0].main == "Clear") {
            weatherIcon = "images/sun.png";
        } else if (day.weather[0].main == "Rain") {
            weatherIcon = "images/rain.png";
        }

        dayElement.innerHTML = `
            <p class="day-name">${dayName}</p>
            <img src="${weatherIcon}" alt="Weather Icon" class="forecast-icon">
            <p class="day-temp">${Math.round(day.temp.day)}°c</p>
        `;

        forecastContainer.appendChild(dayElement);
    });
}

// Event listener for the button
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});


searchBox.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        checkWeather(searchBox.value);
    }
});