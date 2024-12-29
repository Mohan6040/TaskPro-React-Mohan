import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Simulate API call
        if (email === 'demo@example.com' && password === 'demo123') {
          set({ token: 'dummy-token', isAuthenticated: true });
        } else {
          throw new Error('Invalid credentials');
        }
      },
      logout: () => {
        set({ token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);