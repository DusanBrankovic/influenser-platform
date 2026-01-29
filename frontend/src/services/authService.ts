import type { LoginPayload, RegisterPayload } from "@/types/auth.types";


const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function loginApi(
  payload: LoginPayload
): Promise<{ access_token: string }> {
  const res = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err: any = new Error("Login failed");
    err.status = res.status;
    throw err;
  }

  return res.json();
}

export async function registerApi(
  payload: RegisterPayload
): Promise<any> {
  const res = await fetch(`${apiUrl}/influencers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Register failed");
  return res.json();
}
