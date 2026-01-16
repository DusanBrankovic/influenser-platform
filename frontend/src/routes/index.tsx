import { createFileRoute, redirect } from "@tanstack/react-router";
import { getAuthSnapshot } from "@/auth/authStore";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    const { isAuthenticated, user } = getAuthSnapshot();

    // If logged in "real user", send them to the private main page
    if (isAuthenticated && user?.role === "INFLUENCER") {
      throw redirect({ to: "/influensers" });
    }
    // Otherwise redirect to auth page
    throw redirect({ to: "/auth" });
  }
});

