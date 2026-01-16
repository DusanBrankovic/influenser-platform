// src/services/authApi.ts
import type { User } from "../auth/auth.types";

export type LoginPayload = { email: string; password: string };
export type RegisterPayload = {
  email: string;
  password: string;
  name: string;
  role: string;
};

export async function loginApi(
  payload: LoginPayload
): Promise<{ user: User; token: string }> {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function registerApi(
  payload: RegisterPayload
): Promise<{ user: User; token: string }> {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const res = await fetch(`${apiUrl}/influencers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Register failed");
  return res.json();
}
