import { createFileRoute, redirect } from "@tanstack/react-router";
import { getAccessToken, getAccessTokenData } from "@/auth/authStore";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    var token = getAccessToken();

    if (token !== undefined) {
      throw redirect({ to: "/profile/$userId", params: {
        userId: getAccessTokenData()?.sub+''
      } });
    } else {
      throw redirect({ to: "/auth" });
    }
  }
});

