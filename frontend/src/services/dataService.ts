import { getAccessToken } from "@/auth/authStore";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

function authHeaders(): Record<string, string> {
  const token = getAccessToken();

  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getEnumValues(enumType: string): Promise<string[]> {

    const qs = new URLSearchParams();

    qs.set("enumType", enumType);

    const url = `${apiUrl}/data${qs.toString() ? `?${qs.toString()}` : ""}`;

    const res = await fetch(url, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            ...authHeaders(),
        },
    });

    if (!res.ok) throw new Error("Failed to fetch enum values");
    return res.json();
}