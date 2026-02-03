import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const STORAGE_KEY = "phoney_sessions";

export interface Session {
  id: string;
  title: string;
  description: string;
  date: string;
  transcribedText: string;
  createdAt: string;
}

function loadSessionsFromStorage(): Session[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Session[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistSessions(sessions: Session[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch (e) {
    console.warn("Failed to persist sessions", e);
  }
}

const initialState: Session[] = loadSessionsFromStorage();

const sessionsSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    addSession: (state, action: PayloadAction<Omit<Session, "id" | "createdAt">>) => {
      const session: Session = {
        ...action.payload,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      const next = [session, ...state];
      persistSessions(next);
      return next;
    },
    removeSession: (state, action: PayloadAction<string>) => {
      const next = state.filter((s) => s.id !== action.payload);
      persistSessions(next);
      return next;
    },
  },
});

export const { addSession, removeSession } = sessionsSlice.actions;
export default sessionsSlice.reducer;
