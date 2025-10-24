import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("trips")) || [];

const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    addTrip: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("trips", JSON.stringify(state));
    },
    updateTrip: (state, action) => {
      const index = state.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        localStorage.setItem("trips", JSON.stringify(state));
      }
    },
    deleteTrip: (state, action) => {
      const filtered = state.filter((t) => t.id !== action.payload);
      localStorage.setItem("trips", JSON.stringify(filtered));
      return filtered;
    }
  }
});

export const { addTrip, updateTrip, deleteTrip } = tripsSlice.actions;
export default tripsSlice.reducer;
