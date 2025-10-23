const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

export async function getWeatherByCoords(lat, lon) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=de`
  );

  if (!res.ok) {
    throw new Error(`Error loading weather: ${res.status}`);
  }

  const data = await res.json();

  if (!data || !data.main || !data.weather) {
    throw new Error("Incomplete weather data received");
  }

  return data;
}

export async function getForecastByCoords(lat, lon) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=de`
  );

  if (!res.ok) {
    throw new Error(`Error loading forecast: ${res.status}`);
  }

  const data = await res.json();

  if (!data.list) {
    throw new Error("No forecast data received");
  }

  const grouped = {};
  data.list.forEach((entry) => {
    const date = new Date(entry.dt * 1000).toISOString().split("T")[0];
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(entry);
  });

  const dates = Object.keys(grouped).sort();

  const daily = dates.slice(1, 6).map((date) => {
    const entries = grouped[date];
    const temps = entries.map((e) => e.main.temp);
    return {
      ...entries[Math.floor(entries.length / 2)],
      temp_min: Math.min(...temps),
      temp_max: Math.max(...temps)
    };
  });

  return daily;
}
