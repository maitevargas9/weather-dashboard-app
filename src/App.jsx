import { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard";
import { getWeatherByCoords } from "./api/weatherAPI";
import "./App.css";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;

        try {
          const data = await getWeatherByCoords(latitude, longitude);
          setWeatherData({ current: data });
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
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-indigo-400 flex flex-col items-center justify-start p-6">
      <h1 className="text-3xl font-bold text-white drop-shadow-lg mt-6">
        Weather Dashboard
      </h1>
      {loading && <p className="text-white mt-4">Load weather data...</p>}
      {error &&
        <p className="text-red-200 mt-4">
          {error}
        </p>}
      {weatherData && <WeatherCard data={weatherData} />}
    </div>
  );
}
