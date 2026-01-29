import { createFileRoute } from "@tanstack/react-router";
import InfluenserList from "@/pages/InfluenserList";
import { getAllInfluencers } from "@/services/influencerService";
import { getEnumValues } from "@/services/dataService";

export const Route = createFileRoute("/_private/influensers")({
  loader: async () => {

    const influencers = await getAllInfluencers();
    const valueEnumValues =  await getEnumValues('Value');
    const industryEnumValues =  await getEnumValues('Industry');
    
    return { influencers, valueEnumValues, industryEnumValues };
  },
  component: InfluencersAuthedRoute,
});

function InfluencersAuthedRoute() {
  const { influencers, valueEnumValues, industryEnumValues } = Route.useLoaderData();

  return (
    <div>
      <InfluenserList influencers={influencers} valueEnumValues={valueEnumValues} industryEnumValues={industryEnumValues} />
    </div>
  );
}