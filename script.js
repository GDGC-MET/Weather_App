// Assigning all the variables and the api Key and Url
const apiKey = "19f175c397782f927e89a4261b9f3ac5";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".searchbox input");
const searchBtn = document.querySelector(".searchbox button");
const weatherIcon = document.querySelector(".weather-icon");
const currentLocationBtn = document.getElementById("current-location-btn");

// Function to get weather by city name
async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    await handleWeatherResponse(response);
}

// Function to get weather by latitude and longitude
async function checkWeatherByLocation(lat, lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`);
    await handleWeatherResponse(response);
}

// Function to handle the API response and update the UI
async function handleWeatherResponse(response) {
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        searchBox.value = "";
    } else {
        document.querySelector(".error").style.display = "none";
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " kmph";

        // Update the weather icon based on weather conditions
        updateWeatherIcon(data.weather[0].main);

        document.querySelector(".weather").style.display = "block";
    }
}

// Function to update the weather icon based on weather conditions
function updateWeatherIcon(condition) {
    if (condition === "Clouds") {
        weatherIcon.src = "images/clouds.png";
    } else if (condition === "Clear") {
        weatherIcon.src = "images/sun.png";
    } else if (condition === "Rain") {
        weatherIcon.src = "images/rain.png";
    } else if (condition === "Haze") {
        weatherIcon.src = "images/haze.png";
    } else if (condition === "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    } else if (condition === "Mist") {
        weatherIcon.src = "images/mist.png";
    }
}

// Event listener for the search button
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Event listener for the 'Enter' key press (keyCode = 13)
searchBox.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        checkWeather(searchBox.value);
    }
});

// Function to get the user's current location using Geolocation API
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            checkWeatherByLocation(lat, lon); // Fetch weather for current location
        }, () => {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".error p").textContent = "Unable to retrieve location.";
        });
    } else {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".error p").textContent = "Geolocation is not supported by this browser.";
    }
}

// Event listener for the current location button
currentLocationBtn.addEventListener("click", getLocation);

// Automatically fetch weather for current location on page load (optional)
d
