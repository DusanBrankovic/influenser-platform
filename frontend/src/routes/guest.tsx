import GuestInfluencerList from '@/pages/GuestInfluencerList';
import { createFileRoute } from '@tanstack/react-router';
import influencersData from "@/data/guestInfluencers.json";
import type { Influencer } from '@/types/influencer.types';


export const Route = createFileRoute("/guest")({
  component: GuestInfluencerListRouteComponent,
});

const influencers: Influencer[] = influencersData;
const industryEnumValues: string[] = [
    "Fitness",
    "Fashion",
    "Beauty",
    "Lifestyle",
    "Travel",
    "FoodAndCooking",
    "ParentingAndFamily",
    "Gaming",
    "Tech",
    "BusinessAndFinance",
] as const;

const valueEnumValues: string[] = [
    "Authenticity",
    "Transparency",
    "Creativity",
    "Inclusivity",
    "BodyPositivity",
    "MentalHealthAwareness",
] as const;


function GuestInfluencerListRouteComponent() {
  return <GuestInfluencerList influencers={influencers} valueEnumValues={valueEnumValues} industryEnumValues={industryEnumValues} />
}
