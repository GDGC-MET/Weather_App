// Assigning all the variables and the api Key and Url

const apiKey = "19f175c397782f927e89a4261b9f3ac5";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";
const searchBox = document.querySelector(".searchbox input");
const searchBtn = document.querySelector(".searchbox button")
const weatherIcon = document.querySelector(".weather-icon");

// Function for the main task (getting the data from API and displaying it)

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        searchBox.value = "";
        return;
    }
    const data = await response.json();

    // Display current weather
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " kmph";

    // Fetch the forecast
    getForecast(city);
    
    // Display relevant weather icon
    updateWeatherIcon(data.weather[0].main);
    document.querySelector(".weather").style.display = "block";
    searchBox.value = "";
}

// New function to fetch the forecast
async function getForecast(city) {
    const forecastResponse = await fetch(forecastApiUrl + city + `&appid=${apiKey}`);
    const forecastData = await forecastResponse.json();
    displayForecast(forecastData);
}

// Function to display the forecast
function displayForecast(data) {
    const forecastContainer = document.querySelector(".forecast");
    forecastContainer.innerHTML = ""; // Clear previous forecast

    // Loop through the forecast data
    for (let i = 0; i < data.list.length; i += 8) { // every 8th item is a new day
        const dayForecast = data.list[i];
        const date = new Date(dayForecast.dt * 1000).toLocaleDateString(); // Convert timestamp
        const temp = Math.round(dayForecast.main.temp) + "°c";
        const weatherDescription = dayForecast.weather[0].description;

        // Create HTML for the forecast
        const forecastItem = document.createElement("div");
        forecastItem.classList.add("forecast-item");
        forecastItem.innerHTML = `
            <h4>${date}</h4>
            <p>${temp}</p>
            <p>${weatherDescription}</p>
        `;
        forecastContainer.appendChild(forecastItem);
    }
}

// Function to update the weather icon
function updateWeatherIcon(weather) {
    if (weather == "Clouds") {
        weatherIcon.src = "images/clouds.png";
    } else if (weather == "Clear") {
        weatherIcon.src = "images/sun.png";
    } else if (weather == "Rain") {
        weatherIcon.src = "images/rain.png";
    } else if (weather == "Haze") {
        weatherIcon.src = "images/haze.png";
    } else if (weather == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    } else if (weather == "Mist") {
        weatherIcon.src = "images/mist.png";
    }
}

// Event listener for the button
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Enter button(keyCode = 13) event listener
searchBox.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        checkWeather(searchBox.value);
    }
});
