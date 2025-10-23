import { Sun, CloudRain, Cloud, Snowflake, CloudSun } from "lucide-react";

export default function WeatherCard({ data }) {
  if (!data || !data.current) {
    return null;
  }

  const { current } = data;
  const weather = current.weather[0];
  const temp = Math.round(current.main.temp);
  const name = current.name;

  const temp_min = current.main.temp_min
    ? Math.round(current.main.temp_min)
    : temp;
  const temp_max = current.main.temp_max
    ? Math.round(current.main.temp_max)
    : temp;

  const now = new Date(current.dt * 1000);
  const day = now.toLocaleDateString("en-US", { weekday: "long" });
  const formattedDate = now.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long"
  });

  const iconMap = {
    Clear: <Sun className="text-yellow-300 w-12 h-12" />,
    Clouds: <Cloud className="text-gray-300 w-12 h-12" />,
    Rain: <CloudRain className="text-blue-400 w-12 h-12" />,
    Snow: <Snowflake className="text-blue-200 w-12 h-12" />,
    default: <CloudSun className="text-orange-200 w-12 h-12" />
  };
  const icon = iconMap[weather.main] || iconMap.default;

  return (
    <div className="mx-auto mt-10 max-w-sm bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-3xl shadow-lg p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="flex flex-col items-center">
        <p className="font-semibold mb-1">
          {day}
        </p>
        <p className="text-sm text-white/80 mb-2">
          {formattedDate}
        </p>
        {icon}
        <h2 className="text-3xl font-bold mt-2">
          {temp}°C
        </h2>
        <p className="text-sm opacity-80 mt-1">
          {name}
        </p>
        <p className="text-lg mt-2">
          <span>{temp_max}°C</span> / <span>{temp_min}°C</span>
        </p>
      </div>
    </div>
  );
}
