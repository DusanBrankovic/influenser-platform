import React from "react";
import type { AppRole } from "@/types/auth.types";
import { useHasRole } from "./rbac";

export function CanAccess({
  roles,
  fallback = null,
  children,
}: {
  roles: AppRole[];
  fallback?: React.ReactNode;
  children: React.ReactNode;
}) {
  const ok = useHasRole(roles);
  return <>{ok ? children : fallback}</>;
}
