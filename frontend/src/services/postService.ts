import { getAccessToken } from "@/auth/authStore";
import type { Post } from "@/types/post.types";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

function authHeaders(): Record<string, string> {
  const token = getAccessToken();

  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getInfluencerPosts(userId: number): Promise<Post[]> {

    const res = await fetch(`${apiUrl}/posts/influencer/${userId}`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            ...authHeaders(),
        },
    });
    if (!res.ok) throw new Error("Failed to fetch influencers");
    return res.json();
}

export async function createPost(formData: FormData): Promise<Post> {
    const res = await fetch(`${apiUrl}/posts`, {
        method: "POST",
        headers: {
            ...authHeaders(),
        },
        body: formData,
    });

    if (!res.ok) throw new Error("Failed to create post");
    return res.json();
}
