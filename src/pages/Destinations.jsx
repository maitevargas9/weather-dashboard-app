import { useState } from "react";
import { getWeatherByCoords, getForecastByCoords } from "../api/weatherAPI";
import WeatherCard from "../components/WeatherCard";
import ForecastList from "../components/ForecastList";

const destinations = [
  { name: "Berlin", lat: 52.52, lon: 13.405 },
  { name: "Paris", lat: 48.8566, lon: 2.3522 },
  { name: "Barcelona", lat: 41.3851, lon: 2.1734 },
  { name: "Tokyo", lat: 35.6762, lon: 139.6503 },
  { name: "New York", lat: 40.7128, lon: -74.006 }
];

export default function DestinationsPage() {
  const [selected, setSelected] = useState(null);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSelect = async dest => {
    setSelected(dest);
    setLoading(true);
    setError(null);

    try {
      const current = await getWeatherByCoords(dest.lat, dest.lon);
      const forecastData = await getForecastByCoords(dest.lat, dest.lon);
      setWeather({ current });
      setForecast(forecastData);
    } catch (err) {
      console.error(err);
      setError("Weather data could not be loaded.");
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 text-white">
  <h2 className="text-2xl font-bold mb-4">🗺️ Destinations</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 max-w-4xl mx-auto">
    {destinations.map((d) => (
      <button
        key={d.name}
        onClick={() => handleSelect(d)}
        className={`bg-white/10 p-4 rounded-xl hover:bg-white/20 transition ${
          selected?.name === d.name ? "bg-yellow-400 text-black" : ""
        }`}
      >
        <h3 className="text-xl font-semibold">{d.name}</h3>
      </button>
    ))}
  </div>

  {loading ? (
    <p className="mt-6 text-white/80">Loading weather data...</p>
  ) : error ? (
    <p className="mt-6 text-red-300">{error}</p>
  ) : (
    <>
      {weather && (
  <WeatherCard
    data={{
      ...weather,
      current: {
        ...weather.current,
        name: selected.name 
      }
    }}
  />
)}

      {forecast.length > 0 && <ForecastList forecast={forecast} />}
    </>
  )}
</div>
  );
}
