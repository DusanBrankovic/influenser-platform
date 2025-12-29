import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User, AuthState } from "./auth.types";

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // persisted (via partialize)
      user: null,
      token: null,

      // derived / runtime
      isAuthenticated: false,
      isLoading: true,

      // hydration flag (not persisted)
      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),

      // helpers
      setToken: (token: string | null) =>
        set({
          token,
          isAuthenticated: Boolean(token),
        }),

      getToken: () => get().token,

      setIsLoading: (isLoading: boolean) => set({ isLoading }),

      setUser: (user: User | null) => set({ user }),

      login: (user: User, token: string) =>
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        }),

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
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

      // persist only what you actually want to keep
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),

      // runs after state is pulled from storage
      onRehydrateStorage: () => (state, error) => {
        // even if something goes wrong, unblock the UI
        if (error) {
          state?.setIsLoading(false);
          state?.setHasHydrated(true);
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
