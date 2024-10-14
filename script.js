// Assigning all the variables and the API Key and URL
const apiKey = "19f175c397782f927e89a4261b9f3ac5";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".searchbox input");
const searchBtn = document.querySelector(".searchbox button");
const weatherIcon = document.querySelector(".weather-icon");
const favoritesList = document.getElementById("favorites-list");
const lightThemeBtn = document.getElementById("light-theme");
const darkThemeBtn = document.getElementById("dark-theme");

// Function to check weather and update the UI
async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        searchBox.value = "";
    } else {
        document.querySelector(".error").style.display = "none";
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " kmph";

        // Conditions to display the correct weather icon
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/sun.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main == "Haze") {
            weatherIcon.src = "images/haze.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        searchBox.value = ""; // Clear search input

        // Add the city to favorites
        addToFavorites(data.name);
    }
}

// Function to add cities to favorites
function addToFavorites(city) {
    const existingFavorites = Array.from(favoritesList.children).map(item => item.textContent);
    if (!existingFavorites.includes(city)) {
        const li = document.createElement("li");
        li.textContent = city;
        favoritesList.appendChild(li);
    }
}

// Event listener for search button click
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Event listener for Enter key press
searchBox.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        checkWeather(searchBox.value);
    }
});

// Theme switching functionality
lightThemeBtn.addEventListener("click", () => {
    document.body.classList.remove("dark");
    document.querySelector(".w-card").classList.remove("dark");
});

darkThemeBtn.addEventListener("click", () => {
    document.body.classList.add("dark");
    document.querySelector(".w-card").classList.add("dark");
});
