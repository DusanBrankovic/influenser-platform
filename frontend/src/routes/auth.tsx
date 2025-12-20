import { createFileRoute } from "@tanstack/react-router";
import AuthTabs from "@/pages/AuthTabsCard";

export const Route = createFileRoute("/auth")({
  component: AuthTabsPage,
});

function AuthTabsPage() {
  return <AuthTabs />;
}
