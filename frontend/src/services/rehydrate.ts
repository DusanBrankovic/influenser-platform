import { useAuthStore } from "@/auth/authStore";

export function hydrateAuthFromStorage() {
  const authStore = useAuthStore.getState();
  const raw = localStorage.getItem("auth");
  if (!raw) return;

  try {
    const data = JSON.parse(raw);
    authStore.setUser(data.user ?? null);
    authStore.setIsAuthenticated(!!data.isAuthenticated);
  } catch {
    localStorage.removeItem("auth");
  }
}
