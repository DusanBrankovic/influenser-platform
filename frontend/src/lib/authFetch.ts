import { getAccessToken, getActions } from "@/auth/authStore";
import { refreshAccessToken } from "@/services/authService";

let refreshPromise: Promise<string> | null = null;

async function refreshOnce(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const token = await refreshAccessToken();
      getActions().setAccessToken(token);
      return token;
    })().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

export async function authFetch(input: RequestInfo, init: RequestInit = {}) {
  const token = getAccessToken();

  const doFetch = (t?: string) =>
    fetch(input, {
      ...init,
      credentials: "include",
      headers: {
        ...(init.headers || {}),
        ...(t ? { Authorization: `Bearer ${t}` } : {}),
      },
    });

  let res = await doFetch(token);

  if (res.status === 401) {
    try {
      const newToken = await refreshOnce();
      res = await doFetch(newToken);
    } catch {
      await getActions().clearTokens();
      throw new Error("Unauthorized");
    }
  }

  return res;
}
