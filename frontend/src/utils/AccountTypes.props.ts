import type { UserRole } from "@/types/auth.types";

export interface AccountTypesProps {
  id: string;
  role: UserRole;
  title: string;
  description: string;
  icon: string;
  fill?: "outlined" | "filled" | "rounded";
}
