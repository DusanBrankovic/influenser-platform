import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { authStore, getAccessTokenData } from "@/auth/authStore";
import { BottomNav } from "@/components/BottomNavBar";
import type { BottomNavItem } from "@/types/bottomNav.types";

export const Route = createFileRoute("/_private")({
  beforeLoad: () => {

    const { accessToken, accessTokenData } = authStore.getState();

    if (!accessToken || (accessToken && accessTokenData?.role === "GUEST")) {  
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
    param: getAccessTokenData()?.sub!,
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
