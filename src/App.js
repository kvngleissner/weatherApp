import "./App.css";
import Sunny from "./assets/Sunny.jpg";
import Overcast from "./assets/Overcast.jpg";
import Rainy from "./assets/Rainy.jpg";
import Snow from "./assets/Snowy.jpg";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";

function App() {
  const [city, setCity] = useState("Munich");
  const [cityInfo, setCityInfo] = useState({});

  useEffect(() => {
    handleFetch();
  });

  const handleFetch = () => {
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${city}&aqi=no`
    )
      .then((response) => response.json())
      .then((data) =>
        setCityInfo({
          name: data.location.name,
          country: data.location.country,
          celsius: {
            current: data.current.temp_c,
            high: data.forecast.forecastday[0].day.maxtemp_c,
            low: data.forecast.forecastday[0].day.mintemp_c,
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
        cityInfo.condition?.toLowerCase() === "clear" ||
        cityInfo.condition?.toLowerCase() === "sunny"
          ? { backgroundImage: `url(${Sunny})` }
          : cityInfo.condition?.includes("cloudy")
          ? { backgroundImage: `url(${Overcast})` }
          : cityInfo.condition?.toLowerCase().includes("rainy")
          ? { backgroundImage: `url(${Rainy})` }
          : cityInfo.condition?.toLowerCase().includes("snow")
          ? { backgroundImage: `url(${Snow})` }
          : { backgroundImage: `url(${Overcast})` }
      }
    >
      <div className="search-input">
        <input
          type="text"
          value={city}
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
          <h1>{cityInfo.celsius?.current}° C</h1>
          <div className="condition-high-low">
            <h1>{cityInfo.condition}</h1>
            <h1>{cityInfo.celsius?.high}° C</h1>
            <h1>{cityInfo.celsius?.low}° C</h1>
          </div>
        </div>
        <h2>
          {cityInfo.name}, {cityInfo.country}
        </h2>
      </div>
    </div>
  );
}
export default App;
