import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getAuthSnapshot, useAuthStore } from "@/auth/authStore";
import { hydrateAuthFromStorage } from "@/services/rehydrate";
import { BottomNav } from "@/components/BottomNavBar";
import type { BottomNavItem } from "@/components/bottomNav.types";

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
      console.log(isAuthenticated, hasHydrated, "current state");
      throw redirect({ to: "/auth" });
    }
  },
  component: PrivateLayout,
});

const navItems: BottomNavItem[] = [
  {
    key: "influencers",
    type: "route",
    to: "/influensers",
    label: "Influencers",
    icon: "group",
    fuzzy: true,
  },
  {
    key: "profile",
    type: "profile",
    to: "/profile",
    label: "Profile",
    avatarUrl: null,
    avatarFallback: "ME",
    fuzzy: true,
  },
];

function PrivateLayout() {
  return (
    <div>
      <main>
        <Outlet />
        <BottomNav items={navItems} heightPx={60} />
      </main>
    </div>
  );
}
