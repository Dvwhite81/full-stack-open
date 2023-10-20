/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const capital = country.capital[0];

  const getWeather = async () => {
    // eslint-disable-next-line no-undef
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=imperial`;
    try {
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  if (!weather) return null;

  const temp = weather.main.temp;
  const wind = weather.wind.speed;
  const icon = weather.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/w/${icon}.png`;

  return (
    <div className="weather-div">
      <h2>Weather in {capital}</h2>
      <p>temperature {temp} Fahrenheit</p>
      <img src={iconUrl}></img>
      <p>wind {wind} mph</p>
    </div>
  );
};

export default Weather;
