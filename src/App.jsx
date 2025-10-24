import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";
import { fetchWeather } from "./features/weatherSlice";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
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
  const dispatch = useDispatch();
  const { current, forecast, status, error } = useSelector(
    state => state.weather
  );

  useEffect(
    () => {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const { latitude, longitude } = pos.coords;
          dispatch(fetchWeather({ lat: latitude, lon: longitude }));
        },
        err => console.error(err)
      );
    },
    [dispatch]
  );

  return (
    <div className="flex flex-col items-center p-6 text-white">
      <h1 className="text-3xl font-bold drop-shadow-lg mt-6 mb-4">
        🌦️ Weather Dashboard
      </h1>

      {status === "loading" && <p>Load weather data...</p>}
      {error &&
        <p className="text-red-200">
          {error}
        </p>}
      {current && <WeatherCard data={{ current }} />}
      {forecast.length > 0 && <ForecastList forecast={forecast} />}
    </div>
  );
}

export default function App() {
  return (
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
  );
}
