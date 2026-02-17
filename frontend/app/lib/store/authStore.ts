import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api';
import { User, AuthResponse } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isHydrated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setHydrated: (hydrated: boolean) => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      isHydrated: false,

      setLoading: (loading: boolean) => set({ isLoading: loading }),
      setHydrated: (hydrated: boolean) => {
        console.log('AuthStore: Hydration set to', hydrated);
        set({ isHydrated: hydrated });
      },
      setUser: (user: User | null) => set({ user }),
      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true });
          console.log('Login attempt:', { email, password, api });
          const response = await api.post<AuthResponse>('/auth/login', { email, password });
          const { user: userData, token: userToken } = response.data.data;

          set({
            user: userData,
            token: userToken,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          set({ isLoading: false });
          throw new Error(error.response?.data?.message || 'Login failed');
        }
      },

      signup: async (email: string, password: string, name: string) => {
        try {
          set({ isLoading: true });
          const response = await api.post<AuthResponse>('/auth/signup', { email, password, name });
          const { user: userData, token: userToken } = response.data.data;

          set({
            user: userData,
            token: userToken,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          set({ isLoading: false });
          throw new Error(error.response?.data?.message || 'Signup failed');
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
