import { createFileRoute, redirect } from "@tanstack/react-router";
import ProfilePage from "@/pages/ProfilePage";
import { getAccessToken } from "@/auth/authStore";

export const Route = createFileRoute("/_private/profile")({
  beforeLoad: async () => {
    const token = getAccessToken();

    if (!token) {
      throw redirect({ to: "/auth" });
    }
  },
  component: ProfilePage,
});
