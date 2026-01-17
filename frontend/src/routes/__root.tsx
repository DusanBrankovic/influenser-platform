import { getActions } from "@/auth/authStore";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  beforeLoad: () => {
    getActions().init();
  },
  component: RootLayout,
});

function RootLayout() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Outlet />
    </div>
  );
}
