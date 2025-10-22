export default function WeatherCard({ data }) {
  if (!data || !data.current) {
    return null;
  }

  const { current } = data;

  return (
    <div className="p-4 bg-blue-100 rounded-2xl shadow">
      <h2 className="text-xl font-semibold">
        {current.name}
      </h2>
      <p>
        {current.weather[0].description}
      </p>
      <p>
        {Math.round(current.main.temp)}°C
      </p>
    </div>
  );
}
