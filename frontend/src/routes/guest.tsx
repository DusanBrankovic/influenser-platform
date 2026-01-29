import GuestInfluencerList from '@/pages/GuestInfluencerList';
import { createFileRoute } from '@tanstack/react-router';
import influencersData from "@/data/guestInfluencers.json";
import type { Influencer } from '@/types/influencer.types';


export const Route = createFileRoute("/guest")({
  component: GuestInfluencerListRouteComponent,
});

const influencers: Influencer[] = influencersData;
const industryEnumValues: string[] = [
  "BEAUTY_PERSONAL_CARE",
  "FASHION_STYLE",
  "HEALTH_WELLNESS",
  "LIFESTYLE",
  "FOOD_DRINK",
  "TRAVEL_HOSPITALITY",
  "PARENTING_FAMILY",
  "TECH_DIGITAL",
  "EDUCATION_KNOWLEDGE",
  "BUSINESS_ENTREPRENEURSHIP",
  "FINANCE_INVESTING",
  "GAMING_ESPORTS",
  "ENTERTAINMENT_MEDIA",
  "ART_CREATIVITY",
  "SPORTS",
  "SUSTAINABILITY_ETHICS",
  "PETS_ANIMALS",
  "AUTOMOTIVE_MOBILITY",
  "HOME_REAL_ESTATE",
  "OTHER",
] as const;

const valueEnumValues: string[] = [
  "AUTHENTICITY",
  "TRANSPARENCY",
  "QUALITY",
  "HONESTY",
  "PROFESSIONALISM",
  "CREATIVITY",
  "EDUCATION",
  "KNOWLEDGE_SHARING",
  "SUSTAINABILITY",
  "ETHICS",
  "RESPONSIBILITY",
  "MENTAL_HEALTH_BALANCE",
  "SELF_CONFIDENCE",
  "PERSONAL_GROWTH",
  "INCLUSIVITY",
  "DIVERSITY",
  "BODY_POSITIVITY",
  "NATURAL_BEAUTY",
  "INNOVATION",
  "LONG_TERM_PARTNERSHIPS",
  "COMMUNITY",
  "SUPPORT",
  "COMMITMENT",
  "CONSISTENCY",
  "SOCIAL_RESPONSIBILITY",
  "WORK_LIFE_BALANCE",
  "PREMIUM_STANDARDS",
  "ACCESSIBILITY",
  "SUPPORTING_LOCAL_BRANDS",
  "EMPATHY",
  "OTHER",
] as const;



function GuestInfluencerListRouteComponent() {
  return <GuestInfluencerList influencers={influencers} valueEnumValues={valueEnumValues} industryEnumValues={industryEnumValues} />
}
