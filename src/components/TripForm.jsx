import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTrip, updateTrip } from "../features/tripsSlice";
import { v4 as uuid } from "uuid";

export default function TripForm({ editingTrip, setEditingTrip }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState(
    editingTrip || { id: "", destination: "", from: "", to: "" }
  );

  useEffect(
    () => {
      if (editingTrip) {
        setForm(editingTrip);
      }
    },
    [editingTrip]
  );

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.destination || !form.from || !form.to) {
      return;
    }

    if (form.id) {
      dispatch(updateTrip(form));
    } else {
      dispatch(addTrip({ ...form, id: uuid() }));
    }

    setForm({ id: "", destination: "", from: "", to: "" });
    if (setEditingTrip) {
      setEditingTrip(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/10 p-4 rounded-2xl flex flex-col gap-3 w-full max-w-md text-white"
    >
      <input
        type="text"
        placeholder="Destination"
        value={form.destination}
        onChange={e => setForm({ ...form, destination: e.target.value })}
        className="p-2 rounded bg-white/20 placeholder-white/60 focus:bg-white/30 outline-none"
      />
      <div className="flex gap-2">
        <input
          type="date"
          value={form.from}
          onChange={e =>
            setForm({
              ...form,
              from: e.target.value
            })}
          className="flex-1 p-2 rounded bg-white/20 focus:bg-white/30 outline-none"
        />
        <input
          type="date"
          value={form.to}
          onChange={e =>
            setForm({
              ...form,
              to: e.target.value
            })}
          className="flex-1 p-2 rounded bg-white/20 focus:bg-white/30 outline-none"
        />
      </div>
      <button
        type="submit"
        className="bg-indigo-500 hover:bg-indigo-600 transition rounded p-2 font-semibold"
      >
        {form.id ? "Edit" : "Add"}
      </button>
      {form.id &&
        <button
          type="button"
          onClick={() => {
            setForm({ id: "", destination: "", from: "", to: "" });
            setEditingTrip(null);
          }}
          className="bg-gray-400 hover:bg-gray-500 rounded p-2"
        >
          Cancel
        </button>}
    </form>
  );
}
