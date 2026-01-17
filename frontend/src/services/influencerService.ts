import { getAccessToken } from "@/auth/authStore";
import type { Influencer } from "@/types/influencer.types";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

function authHeaders(): Record<string, string> {
  const token = getAccessToken();

  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getAllInfluencers(): Promise<Influencer[]> {

    const res = await fetch(`${apiUrl}/influencers`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            ...authHeaders(),
        },
    });
    if (!res.ok) throw new Error("Failed to fetch influencers");
    return res.json();
}

export async function getLoggedInInfluencer(userId: number): Promise<Influencer> {

    const res = await fetch(`${apiUrl}/influencers/${userId}`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            ...authHeaders(),
        },
    });
    if (!res.ok) throw new Error("Failed to fetch influencers");
    return res.json();
}

export async function togglePrivateProfile(isPrivate: boolean): Promise<{ message: string }> {

    const res = await fetch(`${apiUrl}/influencers/privacy`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            ...authHeaders(),
        },
        body: JSON.stringify({ isPrivate }),
    });
    if (!res.ok) throw new Error("Failed to publish profile");
    return res.json();
}
