import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../features/weatherSlice";
import WeatherCard from "../components/WeatherCard";
import ForecastList from "../components/ForecastList";

export default function Home() {
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

      {status === "loading" && <p>Weather data are being loaded...</p>}
      {error &&
        <p className="text-red-200">
          {error}
        </p>}
      {current && <WeatherCard data={{ current }} />}
      {forecast.length > 0 && <ForecastList forecast={forecast} />}
    </div>
  );
}
