import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getAuthSnapshot, useAuthStore } from "@/auth/authStore";
import { Navigation } from "lucide-react";
import { hydrateAuthFromStorage } from "@/services/rehydrate";

export const Route = createFileRoute("/_private")({
  beforeLoad: () => {
    const { isAuthenticated } = getAuthSnapshot();
    console.log("PRIVATE beforeLoad snapshot:", isAuthenticated);

    const { hasHydrated } = useAuthStore.getState();
    if (!hasHydrated) {
      console.log("Auth store has not hydrated yet.");
    } else {
      hydrateAuthFromStorage();
      console.log("Hydrated auth store from storage.");
    }

    if (
      !isAuthenticated ||
      (isAuthenticated && getAuthSnapshot().user?.role === "guest")
    ) {
      throw redirect({ to: "/auth" });
    }
  },
  component: PrivateLayout,
});

function PrivateLayout() {
  return (
    <div>
      <main>
        <Outlet />
        <Navigation />
      </main>
    </div>
  );
}
