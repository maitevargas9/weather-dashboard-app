import { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import { getWeatherByCoords, getForecastByCoords } from "./api/weatherAPI";
import "./App.css";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        try {
          const current = await getWeatherByCoords(latitude, longitude);
          const forecast = await getForecastByCoords(latitude, longitude);
          setWeatherData({ current });
          setForecastData(forecast.list.slice(0, 7));
        } catch (err) {
          console.error(err);
          setError("Error loading weather data.");
        } finally {
          setLoading(false);
        }
      },
      geoError => {
        console.error(geoError);
        setError("Location could not be determined.");
        setLoading(false);
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 to-indigo-500 flex flex-col items-center justify-start p-6 text-white">
      <h1 className="text-3xl font-bold drop-shadow-lg mt-6 mb-4">
        🌦️ Weather Dashboard
      </h1>

      {loading && <p className="text-white/80 mt-6">Load weather data...</p>}
      {error &&
        <p className="text-red-200 mt-6">
          {error}
        </p>}

      {weatherData && <WeatherCard data={weatherData} />}
      {forecastData.length > 0 && <ForecastList forecast={forecastData} />}
    </div>
  );
}
