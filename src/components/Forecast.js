import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";

function Forecast({ weather }) {
  const { data } = weather;
  const [forecastData, setForecastData] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);

  // Function to get coordinates for a given city
  const getCoordinates = async (city) => {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
    try {
      const res = await axios.get(geoUrl);
      if (res.data.results && res.data.results.length > 0) {
        return {
          latitude: res.data.results[0].latitude,
          longitude: res.data.results[0].longitude
        };
      } else {
        throw new Error("City not found");
      }
    } catch (error) {
      console.log("Error fetching coordinates:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchForecastData = async () => {
      const coordinates = await getCoordinates(data.city);
      if (!coordinates) return;

      const { latitude, longitude } = coordinates;
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;

      try {
        const response = await axios.get(url);
        setForecastData(response.data);
      } catch (error) {
        console.log("Error fetching forecast data:", error);
      }
    };

    fetchForecastData();
  }, [data.city]);

  const getCurrentDate = () => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    };
    const currentDate = new Date().toLocaleDateString("en-US", options);
    return currentDate;
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius((prevState) => !prevState);
  };

  const convertToFahrenheit = (temperature) => {
    return Math.round((temperature * 9) / 5 + 32);
  };

  const renderTemperature = (temperature) => {
    if (isCelsius) {
      return Math.round(temperature);
    } else {
      return convertToFahrenheit(temperature);
    }
  };

  return (
    <div>
      <div className="city-name">
        <h2>
          {data.city}, <span>{data.country}</span>
        </h2>
      </div>
      <div className="date">
        <span>{getCurrentDate()}</span>
      </div>
      <div className="temp">
        {forecastData?.current_weather && (
          <>
            <ReactAnimatedWeather
              icon="CLEAR_DAY"
              size={64}
              color="#f5b041"
            />
            {renderTemperature(forecastData.current_weather.temperature)}
            <sup className="temp-deg" onClick={toggleTemperatureUnit}>
              {isCelsius ? "°C" : "°F"} | {isCelsius ? "°F" : "°C"}
            </sup>
          </>
        )}
      </div>
      <p className="weather-des">Current Weather</p>
      <div className="weather-info">
        <div className="col">
          <ReactAnimatedWeather icon="WIND" size="40" color="#2c3e50"/>
          <div>
            <p className="wind">
              {forecastData?.hourly?.wind_speed_10m?.[0] || "N/A"} m/s
            </p>
            <p>Wind speed</p>
          </div>
        </div>
        <div className="col">
          <ReactAnimatedWeather icon="RAIN" size="40" color="#3498db"/>
          <div>
            <p className="humidity">
              {forecastData?.hourly?.relative_humidity_2m?.[0] || "N/A"}%
            </p>
            <p>Relative Humidity</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forecast;
