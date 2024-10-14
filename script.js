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

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})

// Enter button(keyCode = 13) event listener

searchBox.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        checkWeather(searchBox.value);
    }
});

//Alert data
const alerts = [
    {
        id: 1,
        meassage:"Severe Thunderstorms warning in your are!",
        type: "severe"
    },
    {
        id: 2,
        meassage:"High wind Advisory! Wind speed may go upto 60kmp/h",
        type: "advisory"
    },
    {
        id: 3,
        meassage:"Heat Advisory! Stay hydrated!",
        type: "advisory"
    },
]

//Function to display weather alerts
function displayalerts(){
    const alertcontainer=document.getElementById("alert-container");
    alertcontainer.innerHTML="";
    alerts.forEach(alert => {
        const alertDiv = document.createElement("div");
        alertDiv.classList.add("alert");
        alertDiv.textContent = alert;
        alertDiv.addEventListener("click", () => {
            alertDiv.classList.add("dismissed");
            setTimeout(()=>{
                alertDiv.remove();
            },500);
            })
        
        alertcontainer.appendChild(alertDiv);
    });

}
document.addElementById('checkAlerts').addEventListener('click', displayAlerts);

