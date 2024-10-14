// Assigning all the variables and the api Key and Url

const apiKey = "19f175c397782f927e89a4261b9f3ac5";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".searchbox input");
const searchBtn = document.querySelector(".searchbox button")
const weatherIcon = document.querySelector(".weather-icon");
const weatherSection = document.querySelector(".weather");
const errorMessage = document.querySelector(".error");

const cityList = [
    "Mumbai",
    "Pune",
    "Nagpur",
    "Nashik",
    "Aurangabad",
    "Solapur",
    "Thane",
    "Kalyan-Dombivli",
    "Sangli",
    "Jalna",
    "Ratnagiri",
    "Ahmednagar",
    "Sindhudurg",
    "Bhiwandi",
    "Akola"
];
// Function for the main task (getting the data from API and displaying it)

async function checkWeather(city){

    const cityElement = document.querySelector(".city");

    if (!city) {
        // Reset all data to 0 or default values
        cityElement.innerHTML = "Please specify a city.";
        cityElement.classList.add("small-font"); 
        document.querySelector(".temperature").innerHTML = "";
        document.querySelector(".humidity").innerHTML = "";
        document.querySelector(".wind").innerHTML = "";
        weatherIcon.src = ""; // Reset icon
        document.querySelector(".weather").style.display = "block"; 
        return; 
    } else {
        cityElement.classList.remove("small-font"); 
    }
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

function autocomplete(input) {
    const listContainer = document.querySelector(".autocomplete-list");
    listContainer.innerHTML = ""; // Clear previous suggestions

    if (!input) return; // If input is empty, return

    const suggestions = cityList.filter(city => city.toLowerCase().startsWith(input.toLowerCase()));

    suggestions.forEach(city => {
        const item = document.createElement("div");
        item.classList.add("autocomplete-item");
        item.textContent = city;
        item.addEventListener("click", () => {
            searchBox.value = city; // Set the input value to the selected city
            listContainer.innerHTML = ""; // Clear suggestions
            checkWeather(city); // Call the checkWeather function
        });
        listContainer.appendChild(item);
    });
}

// Event listener for the button

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
    document.querySelector(".autocomplete-list").innerHTML = ""; 
})

// Enter button(keyCode = 13) event listener

searchBox.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        checkWeather(searchBox.value);
        document.querySelector(".autocomplete-list").innerHTML = "";
    }
    else {
        autocomplete(searchBox.value); // Call autocomplete on keyup
    }
});
