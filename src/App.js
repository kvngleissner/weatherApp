import "./App.css";
import { useState, useEffect } from "react";
import Sunny from "./assets/Sunny.jpg";
import Cloudy from "./assets/Cloudy.jpg";
import Rainy from "./assets/Rainy.jpg";
import Snowy from "./assets/Snowy.jpg";
import Overcast from "./assets/Overcast.jpg";
import SearchIcon from "@mui/icons-material/Search";

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
    >
      <div className="search-input">
        <input
          type="text"
          defaultValue="London"
          onChange={(event) => setCity(event.target.value)}
        />
        <SearchIcon
          onClick={handleFetch}
          fontSize="large"
          className="search-button"
        />
      </div>
      <div className="weather-container">
        <div className="topDisplay">
          <h1>{cityInfo.celsius?.current}°</h1>
          <div className="conditionHighLow">
            <h1>{cityInfo.condition}</h1>
            <h1>{cityInfo.celsius?.high}°</h1>
            <h1>{cityInfo.celsius?.low}°</h1>
          </div>
        </div>
        <h2>
          {cityInfo.Name}, {cityInfo.country}
        </h2>
      </div>
    </div>
  );
}

export default App;
