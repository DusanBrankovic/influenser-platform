import { useAuthStore } from "@/auth/authStore";

export function hydrateAuthFromStorage() {
  const authStore = useAuthStore.getState();
  const raw = localStorage.getItem("auth");
  if (!raw) return;

  try {
    const data = JSON.parse(raw);
    authStore.register({
      isAuthenticated: !!data.isAuthenticated,
      user: data.user ?? null,
    });
  } catch {
    localStorage.removeItem("auth");
  }
}
