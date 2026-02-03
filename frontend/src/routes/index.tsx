import { createFileRoute, redirect } from "@tanstack/react-router";
import { getAccessToken } from "@/auth/authStore";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    var token = getAccessToken();

    if (token !== undefined) {
      throw redirect({ to: "/profile" });
    } else {
      throw redirect({ to: "/auth" });
    }
  }
});