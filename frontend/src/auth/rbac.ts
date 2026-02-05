import { useAccessTokenData } from "@/auth/authStore";
import type { AppRole } from "@/types/auth.types";

export function useRole(): AppRole | undefined {
  return useAccessTokenData()?.role;
}

export function useHasRole(roles: AppRole[]) {
  const role = useRole();
  return !!role && roles.includes(role);
}
