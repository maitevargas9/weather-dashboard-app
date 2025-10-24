export default function DestinationsPage() {
  const destinations = [
    { name: "Berlin", country: "Germany" },
    { name: "Paris", country: "France" },
    { name: "Barcelona", country: "Spain" },
    { name: "Tokyo", country: "Japan" },
    { name: "New York", country: "USA" }
  ];

  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl font-bold mb-4">🗺️ Destinations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 max-w-4xl mx-auto">
        {destinations.map(d =>
          <div
            key={d.name}
            className="bg-white/10 p-4 rounded-xl hover:bg-white/20 transition"
          >
            <h3 className="text-xl font-semibold">
              {d.name}
            </h3>
            <p className="text-white/70">
              {d.country}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
