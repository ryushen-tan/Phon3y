import { createSlice } from "@reduxjs/toolkit";

interface RecorderState {
  isRecording: boolean;
}

const initialState: RecorderState = {
  isRecording: false,
};

// Create slice
const recorderSlice = createSlice({
  name: "recorder",
  initialState,
  reducers: {
    startRecording: (state) => {
      return { ...state, isRecording: true }; 
    },
    stopRecording: (state) => {
      return { ...state, isRecording: false };
    },
    toggleRecording: (state) => {
      return { ...state, isRecording: !state.isRecording };
    },
  },
});

// Export actions and reducer
export const { startRecording, stopRecording, toggleRecording } = recorderSlice.actions;
export default recorderSlice.reducer;
