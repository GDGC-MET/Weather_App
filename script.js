// Assigning all the variables and the API Key and URL

const apiKey = "19f175c397782f927e89a4261b9f3ac5";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".searchbox input");
const searchBtn = document.querySelector(".searchbox button");
const weatherIcon = document.querySelector(".weather-icon");

// Function for the main task (getting the data from API and displaying it)

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

        // Call the countUp function to animate the temperature, humidity, and wind speed display
        countUp(0, Math.round(data.main.temp), document.querySelector(".temperature"), "°c");
        countUp(0, data.main.humidity, document.querySelector(".humidity"), "%");
        countUp(0, Math.round(data.wind.speed), document.querySelector(".wind"), " kmph");

        // Conditions to check and display relevant image according to the weather conditions
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
        searchBox.value = "";  // Clear the search box after searching
    }
}

// Function to animate the counting effect for temperature, humidity, and wind
function countUp(start, end, element, unit) {
    let current = start;
    const increment = end > start ? 1 : -1;
    const duration = Math.abs(Math.floor(1000 / (end - start))); // Adjust duration based on value difference
    const timer = setInterval(() => {
        current += increment;
        element.innerHTML = current + unit;
        if (current === end) {
            clearInterval(timer);
        }
    }, duration);
}

// Event listener for the button

searchBtn.addEventListener("click", () => {
    if (searchBox.value.trim() === "") {
        searchBox.classList.add("shake");
        setTimeout(() => {
            searchBox.classList.remove("shake");
        }, 500);
    } else {
        checkWeather(searchBox.value);
    }
});

// Enter button (keyCode = 13) event listener

searchBox.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        if (searchBox.value.trim() === "") {
            searchBox.classList.add("shake");
            setTimeout(() => {
                searchBox.classList.remove("shake");
            }, 500);
        } else {
            checkWeather(searchBox.value);
        }
    }
});
