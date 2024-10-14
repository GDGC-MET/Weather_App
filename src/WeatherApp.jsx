import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { useState } from "react";

export default function WeatherApp(){
    const [weatherInfo, setWeatherInfo] = useState({
        city: "Pune",
        feelsLike: 304.13,
        humidity: 60,
        temp: 302.12,
        tempMax: 302.12,
        tempMin: 302.12,
    });

    let updateInfo = (info) => {
        setWeatherInfo(info);
    }



    return(
        <div>
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox info={weatherInfo}/>
        </div>
    );
}