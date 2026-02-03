import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TranscribeViewState {
  selectedSessionId: string | null;
}

const initialState: TranscribeViewState = {
  selectedSessionId: null,
};

const transcribeViewSlice = createSlice({
  name: "transcribeView",
  initialState,
  reducers: {
    setSelectedSession: (state, action: PayloadAction<string | null>) => {
      state.selectedSessionId = action.payload;
    },
    clearSelectedSession: (state) => {
      state.selectedSessionId = null;
    },
  },
});

export const { setSelectedSession, clearSelectedSession } = transcribeViewSlice.actions;
export default transcribeViewSlice.reducer;
