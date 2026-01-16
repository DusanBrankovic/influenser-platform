import type { User } from "@/auth/auth.types";

export interface RegisterProps {
  onRegister: (user: User) => void;
}
