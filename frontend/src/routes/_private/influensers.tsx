import { createFileRoute } from "@tanstack/react-router";
import InfluenserList from "@/pages/InfluenserList";
import { getAllInfluencers } from "@/services/influencerService";

export const Route = createFileRoute("/_private/influensers")({
  loader: async () => {

    const influencers = await getAllInfluencers();
    return { influencers };
  },
  component: InfluencersAuthedRoute,
});

function InfluencersAuthedRoute() {
  const { influencers } = Route.useLoaderData();

  return (
    <div>
      <InfluenserList influencers={influencers} />
    </div>
  );
}

