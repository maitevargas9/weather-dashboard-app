const API_KEY = import.meta.env.OPENWEATHERMAP_API_KEY;

export async function getWeatherByCoords(lat, lon) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=de`
  );
  return res.json();
}

export async function getForecastByCoords(lat, lon) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&appid=${API_KEY}&units=metric&lang=de`
  );
  return res.json();
}
