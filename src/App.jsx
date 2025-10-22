import { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard";
import { getWeatherByCoords } from "./api/weatherAPI";
import './App.css';

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
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
      (geoError) => {
        console.error(geoError);
        setError("Location could not be determined.");
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return <p>Load weather data...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1>Weather Dashboard App</h1>
      {weatherData ? <WeatherCard data={weatherData} /> : <p>No data</p>}
    </>
  )
}
