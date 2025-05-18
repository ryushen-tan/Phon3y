import { create } from 'zustand';

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthState = {
  user: User | null;
  message: string | null;
  isSignedIn: boolean;
  setMessage: (message: string) => void;
  clearMessage: () => void;
  setUser: (user: User | null, isSignedIn: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isSignedIn: false,
  message: null,
  setMessage: (message: string) => set({ message }),
  clearMessage: () => set({ message: null }),
  setUser: (user, isSignedIn) =>
    set({
      user,
      isSignedIn,
    }),
}));
