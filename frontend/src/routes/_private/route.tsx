import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getAuthSnapshot } from "@/auth/authStore";

export const Route = createFileRoute("/_private")({
  beforeLoad: () => {
    const { isAuthenticated } = getAuthSnapshot();
    if (
      !isAuthenticated ||
      (isAuthenticated && getAuthSnapshot().user?.role === "guest")
    ) {
      throw redirect({ to: "/auth" });
    }
  },
  component: PrivateLayout,
});

function PrivateLayout() {
  return (
    <div>
      <nav>Private bottom nav / private header</nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
