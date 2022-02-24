import "./App.css";
import { useState, useEffect } from "react";
import Sunny from "./assets/Sunny.jpg";
import Cloudy from "./assets/Cloudy.jpg";
import Rainy from "./assets/Rainy.jpg";
import Snowy from "./assets/Snowy.jpg";
import Overcast from "./assets/Overcast.jpg";

function App() {
  const [city, setCity] = useState("London");
  useEffect(() => {
    handleFetch();
  });
  const handleFetch = () => {
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${city}&days=1&aqi=no&alerts=no`
    )
      .then((response) => response.json())
      .then((data) =>
        setCityInfo({
          name: data.location.name,
          country: data.location.country,
          celsius: {
            current: data.current.temp_c,
            high: data.forecast.forecastday[0].day.maxtemp_c,
            min: data.forecast.forecastday[0].day.mintemp_c,
          },
          condition: data.current.condition.text,
        })
      );
    setCity("");
  };

  return (
    <div
      className="App"
      style={
        cityInfo.condition?.tolowercase() === "clear" ||
        cityInfo.condition?.tolowercase() === "sunny"
          ? { backgroundImage: `url(${Sunny})` }
          : cityInfo.condition?.tolowercase.includes("cloudy")
          ? { backgroundImage: `url(${Cloudy})` }
          : cityInfo.condition?.tolowercase.includes("rainy")
          ? { backgroundImage: `url(${Rainy})` }
          : cityInfo.condition?.tolowercase.includes("snow")
          ? { backgroundImage: `url(${Snowy})` }
          : { backgroundImage: `url(${Overcast})` }
      }
    ></div>
  );
}

export default App;
