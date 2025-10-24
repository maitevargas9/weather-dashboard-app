import { Link } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";

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
        <AppRoutes />
      </main>

      <footer className="text-center text-white/70 py-4 text-sm">
        © {new Date().getFullYear()} Itinerary
      </footer>
    </div>
  );
}
