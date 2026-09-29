import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthResponse, LoginCredentials, User } from '@/types';
import { api } from '@/lib/api/client';

export interface AuthState {
  user: AuthResponse | null;
  fullUser: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  fetchFullProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      fullUser: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true });
        try {
          const authData = await api.login(credentials);
          set({
            user: authData,
            accessToken: authData.accessToken,
            refreshToken: authData.refreshToken,
            isAuthenticated: true,
            isLoading: false,
          });

          // Fetch full user profile asynchronously in the background
          get().fetchFullProfile();

          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          const message = error instanceof Error ? error.message : 'Invalid credentials';
          return { success: false, error: message };
        }
      },

      logout: () => {
        set({
          user: null,
          fullUser: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      fetchFullProfile: async () => {
        const { accessToken, user } = get();
        if (!accessToken && !user?.id) return;

        try {
          let profile: User | null = null;
          if (accessToken) {
            try {
              profile = await api.getCurrentUser(accessToken);
            } catch {
              // fallback to fetching by id if token verification has issues
            }
          }

          if (!profile && user?.id) {
            profile = await api.getUserById(user.id);
          }

          if (profile) {
            set({ fullUser: profile });
          }
        } catch (err) {
          console.error('Failed to fetch full user profile:', err);
        }
      },
    }),
    {
      name: 'ecommerce-auth-storage',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined'
          ? window.localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
    }
  )
);
