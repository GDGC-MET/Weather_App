// Assigning all the variables and the api Key and Url

const apiKey = "19f175c397782f927e89a4261b9f3ac5";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".searchbox input");
const searchBtn = document.querySelector(".searchbox button")
const weatherIcon = document.querySelector(".weather-icon");

// Function for the main task (getting the data from API and displaying it)

async function checkWeather(city){

    
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        searchBox.value = "";
    }
    else{
        document.querySelector(".error").style.display = "none";
    }
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;

    document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°c";

    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";

    document.querySelector(".wind").innerHTML = data.wind.speed + " kmph";

    // Conditions for to check and display relevant image according to the weather conditions

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png";
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/sun.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png";
    }
    else if(data.weather[0].main == "Haze"){
        weatherIcon.src = "images/haze.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png";
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png";
    }
    
    document.querySelector(".weather").style.display = "block";

    // Making the searchBox's value empty once searched
    searchBox.value = "";

}

// Event listener for the button

// searchBtn.addEventListener("click", ()=>{
//     checkWeather(searchBox.value);
// })

// Enter button(keyCode = 13) event listener

// searchBox.addEventListener('keyup', function(event) {
//     if (event.keyCode === 13) {
//         checkWeather(searchBox.value);
//     }
// });


// List of cities for suggestion
const cities = ["New York", "New Delhi", "London", "Tokyo", "Paris", "Berlin", "Sydney", "Moscow", "Beijing", "Rome"];

// Elements
const suggestionsList = document.getElementById("suggestions");

// Event listener for the search box to show suggestions
searchBox.addEventListener('input', function() {
    const inputValue = searchBox.value.toLowerCase();
    suggestionsList.innerHTML = ""; // Clear previous suggestions

    if (inputValue) {
        const filteredCities = cities.filter(city => city.toLowerCase().startsWith(inputValue));
        
        // Add filtered cities to suggestions list
        filteredCities.forEach(city => {
            const listItem = document.createElement('li');
            listItem.textContent = city;
            suggestionsList.appendChild(listItem);

            // Event listener for suggestion click
            listItem.addEventListener('click', function() {
                searchBox.value = city; // Set search box to clicked city
                suggestionsList.innerHTML = ""; // Clear suggestions
            });
        });
    }
});

// Hide suggestions when search button is clicked
searchBtn.addEventListener('click', () => {
    suggestionsList.innerHTML = "";
    checkWeather(searchBox.value);
});

// Hide suggestions when the Enter key is pressed
searchBox.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        suggestionsList.innerHTML = "";
    }
});
