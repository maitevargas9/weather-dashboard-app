import { useState } from "react";
import TripForm from "../components/TripForm";
import TripList from "../components/TripList";

export default function Trips() {
  const [editingTrip, setEditingTrip] = useState(null);

  return (
    <div className="flex flex-col items-center mt-10 p-4 text-white">
      <h2 className="text-3xl font-bold mb-4">🧳 My Travels</h2>
      <TripForm editingTrip={editingTrip} setEditingTrip={setEditingTrip} />
      <TripList setEditingTrip={setEditingTrip} />
    </div>
  );
}
