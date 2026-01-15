import { createFileRoute, redirect } from "@tanstack/react-router";
import InfluenserList from "@/pages/InfluenserList";
import { getAuthSnapshot } from "@/auth/authStore";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    const { isAuthenticated, user } = getAuthSnapshot();

    // If logged in "real user", send them to the private main page
    if (isAuthenticated && user?.role === "user") {
      throw redirect({ to: "/influensers" });
    } else if (!isAuthenticated) {
      if (user?.role === null) {
        throw redirect({ to: "/auth" });
      }
    }
  },
  component: PublicHomeRoute,
});

function PublicHomeRoute() {
  return (
    <div>
      <header>Guest header (search only)</header>
      <InfluenserList mode="guest" />
    </div>
  );
}
