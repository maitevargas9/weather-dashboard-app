import { Sun, CloudRain, Cloud, Snowflake, CloudSun } from "lucide-react";

export default function ForecastList({ forecast }) {
  const iconMap = {
    Clear: <Sun className="text-yellow-300 w-8 h-8" />,
    Clouds: <Cloud className="text-gray-200 w-8 h-8" />,
    Rain: <CloudRain className="text-blue-300 w-8 h-8" />,
    Snow: <Snowflake className="text-blue-100 w-8 h-8" />,
    default: <CloudSun className="text-orange-200 w-8 h-8" />
  };

  return (
    <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 w-full max-w-5xl">
      {forecast.map((item, i) => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString("en-US", { weekday: "long" });
        const formattedDate = date.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "long"
        });
        const weatherMain = item.weather[0].main;
        const icon = iconMap[weatherMain] || iconMap.default;

        return (
          <div
            key={i}
            className="bg-white/10 p-4 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-white/20 transition-all duration-300"
          >
            <p className="font-semibold mb-1">
              {day}
            </p>
            <p className="text-sm text-white/80 mb-2">
              {formattedDate}
            </p>
            <div className="flex justify-center items-center my-2">
              {icon}
            </div>
            <p className="text-lg mt-2">
              <span>{Math.round(item.temp_max)}°C</span> /{" "}
              <span>{Math.round(item.temp_min)}°C</span>
            </p>
          </div>
        );
      })}
    </div>
  );
}
