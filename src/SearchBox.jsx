import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useScrollTrigger } from '@mui/material';
import { useState } from 'react';

export default function SearchBox({updateInfo}){

    let [city, setCity] = useState("");

    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "1abb0f009a987488cc54deb556d9da17";

    const getWeatherInfo = async() => { 
        let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metrics`);
        let jsonResponse = await response.json();
        console.log(jsonResponse);

        let result  = {
            city: city,
            temp: jsonResponse.main.temp,
            tempMin: jsonResponse.main.temp_min,
            tempMax: jsonResponse.main.temp_max,
            humidity: jsonResponse.main.humidity,
            feelsLike: jsonResponse.main.feels_like,
            weather: jsonResponse.weather[0],
        };
        console.log(result);
        return result;
    };

    let handleChange = (event) =>{
        setCity(event.target.value);
    };

    let handleSubmit = async (event) =>{
        event.preventDefault();
        console.log(city);
        setCity("");
        let info = await getWeatherInfo();
        updateInfo(info);

    };

    return(
        <div>
            <h4>Search for weather</h4>
            <form onSubmit={handleSubmit}>
            <TextField id="city" label="City Name" variant="outlined" required value={city} onChange={handleChange} />
            <br /><br />
            <Button variant="contained" type='submit'>Search</Button>
            </form>
        </div>
    );
}