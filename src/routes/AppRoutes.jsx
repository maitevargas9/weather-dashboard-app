import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Destinations from "../pages/Destinations";
import Trips from "../pages/Trips";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/destinations" element={<Destinations />} />
      <Route path="/trips" element={<Trips />} />
    </Routes>
  );
}
