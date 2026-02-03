import type { LoginPayload, RegisterPayload } from "@/types/auth.types";
import { ApiError } from "@/types/error.types";
import type { RegisterResponse } from "@/types/response.types";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function loginApi(
  payload: LoginPayload,
): Promise<{ access_token: string }> {
  const res = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new ApiError("Login failed", res.status);
  }

  return res.json();
}

export async function registerApi(
  payload: RegisterPayload,
): Promise<RegisterResponse> {
  const res = await fetch(`${apiUrl}/influencers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Register failed");
  return res.json();
}
