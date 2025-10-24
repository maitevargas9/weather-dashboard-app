import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../features/weatherSlice";
import tripsReducer from "../features/tripsSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    trips: tripsReducer
  }
});

export default store;
