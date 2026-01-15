import { createFileRoute } from "@tanstack/react-router";
import InfluenserList from "@/pages/InfluenserList";

export const Route = createFileRoute("/_private/influensers")({
  component: InfluencersAuthedRoute,
});

function InfluencersAuthedRoute() {
  return (
    <div>
      <header>Signed-in header / extra actions</header>
      <InfluenserList mode="authed" />
    </div>
  );
}
