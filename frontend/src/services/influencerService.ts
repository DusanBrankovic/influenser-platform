import { getAccessToken } from "@/auth/authStore";
import type { Influencer, SearchQueryParams, UpdateInfluencerDto } from "@/types/influencer.types";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

function authHeaders(): Record<string, string> {
  const token = getAccessToken();

  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getAllInfluencers(
  params?: SearchQueryParams,
): Promise<Influencer[]> {
  const qs = new URLSearchParams();

  if (params?.name?.trim()) qs.set("name", params.name.trim());

  params?.value?.forEach((v) => qs.append("value", v));
  params?.industry?.forEach((i) => qs.append("industry", i));

  if (params?.experience_range !== undefined) {
    qs.set("experience_range", String(params.experience_range));
  }

  const url = `${apiUrl}/influencers${qs.toString() ? `?${qs.toString()}` : ""}`;

  console.log("Fetching influencers with URL:", url);

  const res = await fetch(url, {
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

export async function updateInfluencer(updateInfluencerDto: UpdateInfluencerDto): Promise<{ updatedInfluencer: Influencer }> {

    const res = await fetch(`${apiUrl}/influencers/me`, {
        method: "PATCH",
        headers: { 
            "Content-Type": "application/json",
            ...authHeaders(),
        },
        body: JSON.stringify(updateInfluencerDto),
    });
    if (!res.ok) {
        console.error("Failed to update profile:", await res.text());
        throw new Error("Failed to update profile");
    }
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

export async function isLoggedInUserPublished(): Promise<boolean> {

    const res = await fetch(`${apiUrl}/influencers/privacy`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            ...authHeaders(),
        }
    });
    if (!res.ok) throw new Error("Failed to check profile publication status");
    return res.json();
}

export async function deleteInfluencer(userId: number) {
    await fetch(`${apiUrl}/influencers/${userId}`, {
        method: "DELETE",
        headers: { 
            "Content-Type": "application/json",
            ...authHeaders(),
        }
    });
}
