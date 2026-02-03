// routes/auth.tsx
import { createFileRoute, redirect } from "@tanstack/react-router";
import { authStore } from "@/auth/authStore";
import AuthTabs from "@/pages/AuthTabsCard";
import z from "zod";

export const Route = createFileRoute("/auth")({
  
  validateSearch: z.object({
    tab: z.enum(["signin", "register"]).optional(),
  }),
  
  beforeLoad: () => {

    const { accessToken, accessTokenData } = authStore.getState();

    if (accessToken !== undefined && accessTokenData?.role !== "GUEST") {
      throw redirect({ to: "/influensers" });
    }
  },
  component: AuthTabsPage,
});

function AuthTabsPage() {
  return <AuthTabs />;
}