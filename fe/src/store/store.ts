import { configureStore } from "@reduxjs/toolkit";
import recorderSlice from "./recorderSlice";
import sessionsSlice from "./sessionsSlice";
import transcribeViewSlice from "./transcribeViewSlice";

export const store = configureStore({
  reducer: {
    recorder: recorderSlice,
    sessions: sessionsSlice,
    transcribeView: transcribeViewSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
