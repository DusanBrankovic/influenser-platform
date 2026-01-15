// routes/auth.tsx
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/auth/authStore";
import AuthTabs from "@/pages/AuthTabsCard";

export const Route = createFileRoute("/auth")({
  beforeLoad: () => {
    const { hasHydrated, isAuthenticated, user } = useAuthStore.getState();

    if (!hasHydrated) return;

    if (isAuthenticated && user?.role !== "guest") {
      throw redirect({ to: "/influensers" });
    }
  },
  component: AuthTabsPage,
});

function AuthTabsPage() {
  return <AuthTabs />;
}
