import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { authStore } from "@/auth/authStore";
import { BottomNav } from "@/components/BottomNavBar";
import type { BottomNavItem } from "@/types/bottomNav.types";
import { useCustomContext } from "@/state-management/useContextHook";

export const Route = createFileRoute("/_private")({
  beforeLoad: () => {

    const { accessToken, accessTokenData } = authStore.getState();

    if (!accessToken || (accessToken && accessTokenData?.role === "GUEST")) {  
      throw redirect({ to: "/auth" });
    }
  },
  component: PrivateLayout,
});

function PrivateLayout() {
  const { openCreatePost } = useCustomContext();
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
   {
    key: "create-post",
    type: "route",
    to: "/profile",
    label: "Create post",
    fuzzy: true,
    icon: "add_circle",
    onClick: () => {
      openCreatePost();
    },
  },
];
  return (
    <div>
      <main>
        <Outlet />
        <BottomNav items={navItems} heightPx={60} />
      </main>
    </div>
  );
}
