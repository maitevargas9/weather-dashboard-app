import { useSelector, useDispatch } from "react-redux";
import { deleteTrip } from "../features/tripsSlice";
import { Pencil, Trash2 } from "lucide-react";

export default function TripList({ setEditingTrip }) {
  const trips = useSelector(state => state.trips);
  const dispatch = useDispatch();

  if (trips.length === 0) {
    return <p className="text-white/80 mt-4">No trips saved yet.</p>;
  }

  return (
    <div className="mt-6 grid gap-4 w-full max-w-md">
      {trips.map(trip =>
        <div
          key={trip.id}
          className="bg-white/10 p-4 rounded-2xl flex justify-between items-center text-white hover:bg-white/20 transition"
        >
          <div>
            <p className="font-semibold text-lg">
              {trip.destination}
            </p>
            <p className="text-sm text-white/70">
              {trip.from} → {trip.to}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setEditingTrip(trip)}
              className="hover:text-yellow-300"
              title="Edit"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={() => dispatch(deleteTrip(trip.id))}
              className="hover:text-red-400"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
