import { UserRole } from "@/types/auth.types";
import type { AccountTypesProps } from "./AccountTypes.props";
export const accountTypes: AccountTypesProps[] = [
  {
    id: "business",
    role: UserRole.BUSINESS,
    title: "Ja sam biznis",
    description:
      "Želim da pretražim influensere i kontaktiram izabranog influensera za dalju saradnju",
    icon: "domain",
    fill: "rounded",
  },
  {
    id: "influencer",
    role: UserRole.INFLUENCER,
    title: "Ja sam influenser",
    description:
      "Želim da kreiram svoj profil na kome mogu prikazati rezultate svojih saradnji",
    icon: "id_card",
    fill: "outlined",
  },
];
