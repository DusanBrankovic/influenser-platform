import { createFileRoute, redirect } from "@tanstack/react-router";
import InfluenserList from "@/pages/InfluenserList";
import { getAuthSnapshot } from "@/auth/authStore";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    const { isAuthenticated } = getAuthSnapshot();
    if (
      !isAuthenticated ||
      (isAuthenticated && getAuthSnapshot().user?.role === "guest")
    ) {
      throw redirect({ to: "/auth" });
    }
  },
  component: HomeRoute,
});

function HomeRoute() {
  const { isAuthenticated, user } = getAuthSnapshot();
  const role = user?.role;

  useEffect(() => {
    console.log("isAuthenticated", isAuthenticated);
    console.log("user", user);
  }, [isAuthenticated, user]);

  return (
    <div>
      {isAuthenticated && role === "user" && (
        <div>
          <header>Signed-in header / extra actions</header>
          <InfluenserList mode="authed" />
        </div>
      )}
    </div>
  );
}
