import type { User } from "@/auth/auth.types";

export interface SignInProps {
  onSwitchToSignUp: () => void;
  onLogin: (user: User, token: string) => void;
  onGuest: () => void;
}
