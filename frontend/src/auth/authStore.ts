import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User, AuthState } from "./auth.types";

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      isAuthenticated: false,
      isLoading: true,
      isRegistered: false,

      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),

      setIsAuthenticated: (v: boolean) => set({ isAuthenticated: v }),

      setToken: (token: string | null) =>
        set({
          token,
          isAuthenticated: Boolean(token),
        }),

      getToken: () => get().token,

      setIsLoading: (isLoading: boolean) => set({ isLoading }),
      setIsRegistered: (isRegistered: boolean) => set({ isRegistered }),

      setUser: (user: User | null) => set({ user }),

      login: (user: User, token: string) =>
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          isRegistered: true,
        }),

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          isRegistered: false,
        });
      },

      loginAsGuest: () =>
        set({
          user: {
            fullname: "Guest",
            email: "guest@local",
            username: "guest",
            headline: "Browsing as guest",
            role: "guest",
          },
          token: "guest-token",
          isAuthenticated: true,
          isLoading: false,
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),

      onRehydrateStorage: () => (state, error) => {
        if (error) {
          state?.setIsLoading(false);
          state?.setHasHydrated(true);
          state?.setIsRegistered(false);
          return;
        }

        // IMPORTANT: recompute derived fields from persisted data
        const token = state?.token ?? null;
        state?.setToken(token); // sets isAuthenticated based on token

        state?.setIsLoading(false);
        state?.setHasHydrated(true);
      },
    }
  )
);

export { useAuthStore, type User, type AuthState };

export const getAuthSnapshot = () => {
  const { user, token, isAuthenticated, hasHydrated, isLoading } =
    useAuthStore.getState();

  return { user, token, isAuthenticated, hasHydrated, isLoading };
};
