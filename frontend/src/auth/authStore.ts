import { create } from "zustand";
import type { User, AuthState } from "./auth.types";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: true,
      isAuthenticated: false,

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

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        }),

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
      // initializeAuth: async () => {
      //   set({ isLoading: true });

      //   const token = localStorage.getItem("token");
      //   const userRaw = localStorage.getItem("user");
      //   const user = userRaw ? (JSON.parse(userRaw) as User) : null;

      //   set({
      //     token,
      //     user,
      //     isAuthenticated: Boolean(token),
      //     isLoading: false,
      //   });
      // },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setIsLoading(false);
      },
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);

export { useAuthStore, type User, type AuthState };

export const getAuthSnapshot = () => {
  const { user, token, isAuthenticated } = useAuthStore.getState();

  return { user, token, isAuthenticated };
};
