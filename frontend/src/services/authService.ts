// import type { LoginPayload, RegisterPayload } from "@/types/auth.types";

// const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

// //
// // LOGIN
// //
// export async function loginApi(
//   payload: LoginPayload
// ): Promise<{ accessToken: string }> {

//   console.log(payload.email + " " + payload.password + " <- login payload");
//   const res = await fetch(`${apiUrl}/auth/login`, {
//     method: "POST",
//     credentials: "include", // IMPORTANT for cookie
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });

//   if (!res.ok) {
//     const err: any = new Error("Login failed");
//     err.status = res.status;
//     throw err;
//   }

//   return res.json();
// }

// //
// // REFRESH
// //
// export async function refreshAccessToken(): Promise<string> {
//   const res = await fetch(`${apiUrl}/auth/refresh`, {
//     method: "POST",
//     credentials: "include", // sends refresh cookie
//   });

//   if (!res.ok) throw new Error("Refresh failed");

//   const data: { access_token: string } = await res.json();
//   return data.access_token;
// }

// //
// // REGISTER (no cookie needed here, but keep base url consistent)
// //
// export async function registerApi(
//   payload: RegisterPayload
// ): Promise<any> {
//   const res = await fetch(`${apiUrl}/influencers`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });

//   if (!res.ok) throw new Error("Register failed");
//   return res.json();
// }

import type { LoginPayload, RegisterPayload } from "@/types/auth.types";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function loginApi(
  payload: LoginPayload
): Promise<{ accessToken: string }> {

  console.log("Login request set with credentials include " + payload.email, payload.password, payload.rememberMe);
  const res = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    credentials: "include",
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

export async function refreshAccessToken(): Promise<string> {
  const res = await fetch(`${apiUrl}/auth/refresh`, {
    method: "POST",
    credentials: "include", // sends refresh cookie
  });

  console.log("Refreshed access token:", await res.json());
  if (!res.ok) throw new Error("Refresh failed");

  const data: { accessToken: string } = await res.json();

  return data.accessToken;
}

export async function logoutApi(): Promise<void> {
  await fetch(`${apiUrl}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}

// keep your register as is (no cookies needed)
export async function registerApi(payload: RegisterPayload): Promise<any> {
  const res = await fetch(`${apiUrl}/influencers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Register failed");
  return res.json();
}

