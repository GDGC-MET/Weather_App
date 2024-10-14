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
//function to handle API response 
function fetchWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            // Existing code to update UI with weather data
        })
        .catch(error => {
            // Update UI to show error message
            document.getElementById('error-message').textContent = error.message;
        });
}
//function for autocomplete
async function autocomplete() {
    const input = document.getElementById('city-input').value;
    const suggestionsDiv = document.getElementById('suggestions');
    if (input.length < 3) {
        suggestionsDiv.innerHTML = ''; // Clear suggestions if input is less than 3 characters
        return;
    }

    const response = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${input}&type=like&sort=population&cnt=5&appid=${apiKey}`);
    const data = await response.json();

    suggestionsDiv.innerHTML = ''; // Clear previous suggestions

    data.list.forEach(city => {
        const suggestionItem = document.createElement('div');
        suggestionItem.textContent = `${city.name}, ${city.sys.country}`;
        suggestionItem.onclick = () => {
            document.getElementById('city-input').value = city.name;
            suggestionsDiv.innerHTML = ''; // Clear suggestions after selecting a city
            checkWeather(city.name); // Fetch weather for selected city
        };
        suggestionsDiv.appendChild(suggestionItem);
    });
}
//autocomplete
const cities = [
    "New Delhi",
    "Mumbai",
    "Bangalore",
    "Kolkata",
    "Chennai",
    "Hyderabad",
    "Ahmedabad",
    "Pune",
    "Jaipur",
    "Surat",
    // Add more city names as needed
];

function autocomplete() {
    const input = document.getElementById('suggestions');
    const filter = input.value.toLowerCase();
    const suggestionsList = document.getElementById('suggestions-list');
    suggestionsList.innerHTML = ''; // Clear previous suggestions

    if (filter) {
        const filteredCities = cities.filter(city => city.toLowerCase().includes(filter));
        
        if (filteredCities.length > 0) {
            suggestionsList.style.display = 'block'; // Show suggestions
            filteredCities.forEach(city => {
                const li = document.createElement('li');
                li.textContent = city;
                li.onclick = () => selectCity(city); // Add click event to select city
                suggestionsList.appendChild(li);
            });
        } else {
            suggestionsList.style.display = 'none'; // Hide if no matches
        }
    } else {
        suggestionsList.style.display = 'none'; // Hide if input is empty
    }
}
searchBox.addEventListener('keyup', autocomplete);
function selectCity(city) {
    document.getElementById('suggestions').value = city; // Set input value
    document.getElementById('suggestions-list').style.display = 'none'; // Hide suggestions
}
// Event listener for the button

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})
// Enter button(keyCode = 13) event listener

searchBox.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        checkWeather(searchBox.value);
    }
});
