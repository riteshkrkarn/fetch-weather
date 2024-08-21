import { useEffect, useState } from "react";
import axios from "axios";

import ClearIcon from "../assets/clear.png";
import CloudIcon from "../assets/cloud.png";
import DrizzleIcon from "../assets/drizzle.png";
import HumidityIcon from "../assets/humidity.png";
import RainIcon from "../assets/rain.png";
import SnowIcon from "../assets/snow.png";
import WindIcon from "../assets/wind.png";

function FetchComp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${"4798bd226eccfb540ec8463ac3ff7f89"}`
      );
      setWeatherData({
        name: response.data.name,
        humidity: response.data.main.humidity,
        windSpeed: parseFloat(response.data.wind.speed.toFixed(1)),
        temperature: Math.round(response.data.main.temp),
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    if (weatherData) {
      console.log(weatherData);
    }
  }, [weatherData]);

  return (
    <>
      <div className="bg-[#3D34B1] flex flex-col w-4/5 md:w-2/5 mx-auto rounded-2xl text-white">
        {/* Main Div */}
        {/* Search Bar starts here */}
        <div>
          <nav className="flex pt-8 justify-evenly items-center px-0">
            <input
              type="text"
              placeholder="Search"
              className="p-2 px-4 rounded-full md:w-1/2 text-black"
              value={city}
              onChange={handleCityChange}
            />
            <div
              className="bg-white rounded-full p-2 cursor-pointer"
              onClick={() => fetchWeather(city)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill="none"
              >
                <path
                  d="M17.5 17.5L22 22"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </nav>
        </div>
        {/* Search Bar ends here */}

        {/* Weather Info starts here */}
        <div className="flex flex-col justify-center items-center">
          <div>
            <img src={ClearIcon} alt="Weather Icon" className="w-25" />
          </div>
          <div className="mb-4">
            <h1 className="text-7xl">
              {weatherData ? `${weatherData.temperature}°C` : "N/A"}
            </h1>
            <p className="text-4xl">
              {weatherData ? weatherData.name : "City"}
            </p>
          </div>
        </div>
        {/* Weather Info ends here */}

        {/* Humidity and Air info starts here */}
        <div className="flex p-3 m-4 justify-between">
          {/* Humidity Info starts here */}
          <div className="flex justify-evenly w-1/2 items-center">
            <div>
              <img src={HumidityIcon} alt="Humidiity Icon" className="w-8" />
            </div>
            <div>
              <h1 className="text-lg">
                {" "}
                {weatherData ? `${weatherData.humidity} %` : "N/A"}
              </h1>
              <p className="text-xs">Humidity</p>
            </div>
          </div>
          {/* Humidity Info ends here */}

          {/* Air Info starts here */}
          <div className="flex justify-evenly w-1/2 items-center">
            <div>
              <img src={WindIcon} alt="Humidiity Icon" className="w-8" />
            </div>
            <div>
              <h1 className="text-lg">
                {" "}
                {weatherData ? `${weatherData.windSpeed} Km/h` : "N/A"}
              </h1>
              <p className="text-xs">Wind Speed</p>
            </div>
          </div>
          {/* Air Info ends here */}
        </div>
        {/* Humidity and Air info starts here */}
      </div>
    </>
  );
}

export default FetchComp;
