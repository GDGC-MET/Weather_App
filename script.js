// Assigning all the variables and the api Key and Url

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
    }
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

// Conditions for to check and display relevant image according to the weather conditions

    switch(data.weather[0].main) {
        case "Clouds":
            weatherIcon.src = "images/clouds.png";
            break;
        case "Clear":
            weatherIcon.src = "images/sun.png";
            break;
        case "Rain":
            weatherIcon.src = "images/rain.png";
            break;
        case "Haze":
            weatherIcon.src = "images/haze.png";
            break;
        case "Drizzle":
            weatherIcon.src = "images/drizzle.png";
            break;
        case "Mist":
            weatherIcon.src = "images/mist.png";
            break;
        default:
            weatherIcon.src = "images/default.png"; 
    }

    document.querySelector(".weather").style.display = "block";

        // Making the searchBox's value empty once searched

    searchBox.value = "";
}


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    document.querySelector(".city").innerHTML = data.name;
                    document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°C";
                    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
                    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

                    
                    switch(data.weather[0].main) {
                        case "Clouds":
                            weatherIcon.src = "images/clouds.png";
                            break;
                        case "Clear":
                            weatherIcon.src = "images/sun.png";
                            break;
                        case "Rain":
                            weatherIcon.src = "images/rain.png";
                            break;
                        case "Haze":
                            weatherIcon.src = "images/haze.png";
                            break;
                        case "Drizzle":
                            weatherIcon.src = "images/drizzle.png";
                            break;
                        case "Mist":
                            weatherIcon.src = "images/mist.png";
                            break;
                        default:
                            weatherIcon.src = "images/default.png";
                    }

                    document.querySelector(".weather").style.display = "block";
                })
                .catch(error => {
                    console.error("Error fetching location data:", error);
                });
        }, () => {
            console.error("Geolocation permission denied.");
        });
    } else {
        console.error("Geolocation is not supported by this browser.");
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
window.onload = getLocation;
