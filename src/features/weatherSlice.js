import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWeatherByCoords, getForecastByCoords } from "../api/weatherAPI";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async ({ lat, lon }, { rejectWithValue }) => {
    try {
      const current = await getWeatherByCoords(lat, lon);
      const forecast = await getForecastByCoords(lat, lon);
      return { current, forecast };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    current: null,
    forecast: [],
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.current = action.payload.current;
        state.forecast = action.payload.forecast;
        state.error = null;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch weather data.";
      });
  }
});

export default weatherSlice.reducer;
