import { UserRole } from "@/types/auth.types";
import type { AccountTypesProps } from "./AccountTypes.props";

export const accountTypes: AccountTypesProps[] = [
  {
    id: "business",
    role: UserRole.BUSINESS,
    title: "I am a business",
    description:
      "I want to search for influencers and contact selected influencers for potential collaboration",
    icon: "domain",
    fill: "rounded",
  },
  {
    id: "influencer",
    role: UserRole.INFLUENCER,
    title: "I am an influencer",
    description:
      "I want to create my profile where I can showcase the results of my collaborations",
    icon: "id_card",
    fill: "outlined",
  },
];