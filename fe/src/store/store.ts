import { configureStore } from "@reduxjs/toolkit";
import recorderSlice from "./recorderSlice"; // Ensure this is a valid Redux slice
export const store = configureStore({
  reducer: {
    recorder: recorderSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
