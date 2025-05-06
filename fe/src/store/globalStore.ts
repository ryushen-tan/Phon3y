import { create } from 'zustand';

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthState = {
  user: User | null;
  isSignedIn: boolean;
  setUser: (user: User | null, isSignedIn: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isSignedIn: false,
  setUser: (user, isSignedIn) =>
    set({
      user,
      isSignedIn,
    }),
}));
