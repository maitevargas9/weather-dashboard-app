import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import { getWeatherByCoords, getForecastByCoords } from "./api/weatherAPI";
import "./App.css";

function Destinations() {
  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl font-bold mb-4">🗺️ Destinations</h2>
      <p className="text-white/80">
        Soon you will be able to select from predefined destinations and check
        the weather to check.
      </p>
    </div>
  );
}

function Trips() {
  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl font-bold mb-4">🧳 My Travels</h2>
      <p className="text-white/80">
        Here you can soon plan, save, and adjust your trips.
      </p>
    </div>
  );
}

function Home() {
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
          setForecastData(forecast);
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

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-sky-300 to-indigo-500 flex flex-col text-white">
        <nav className="flex justify-center gap-6 bg-indigo-700/40 py-4 shadow-md backdrop-blur">
          <Link to="/" className="hover:text-yellow-300 transition">
            Home
          </Link>
          <Link to="/destinations" className="hover:text-yellow-300 transition">
            Destinations
          </Link>
          <Link to="/trips" className="hover:text-yellow-300 transition">
            Travel
          </Link>
        </nav>

        <main className="flex-1 flex flex-col items-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/trips" element={<Trips />} />
          </Routes>
        </main>

        <footer className="text-center text-white/70 py-4 text-sm">
          © {new Date().getFullYear()} Itinerary
        </footer>
      </div>
    </Router>
  );
}
