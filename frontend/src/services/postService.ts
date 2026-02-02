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

export async function deletePost(postId: number): Promise<void> {
    const res = await fetch(`${apiUrl}/posts/${postId}`, {
        method: "DELETE",
        headers: {
            ...authHeaders(),
        },
    });

    if (!res.ok) throw new Error("Failed to delete post");
}

export async function editPost(formData: FormData): Promise<Post> {
    const postId = formData.get("postId");
    formData.delete("postId");
    const res = await fetch(`${apiUrl}/posts/${postId}`, {
        method: "PUT",
        headers: {
            ...authHeaders(),
        },
       body: formData,
    });

    if (!res.ok) throw new Error("Failed to edit post");
    return res.json();
}

export async function likePost(postId: number): Promise<void> {
    const res = await fetch(`${apiUrl}/posts/${postId}/like`, {
        method: "POST",
        headers: {
            ...authHeaders(),
        },
    });

    if (!res.ok) throw new Error("Failed to like post");
}

export async function savePost(postId: number): Promise<void> {
    const res = await fetch(`${apiUrl}/posts/${postId}/save`, {
        method: "POST",
        headers: {
            ...authHeaders(),
        },
    });

    if (!res.ok) throw new Error("Failed to save post");
}

export async function getPostById(postId: number): Promise<Post | null> {
    const res = await fetch(`${apiUrl}/posts/${postId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...authHeaders(),
        },
    });

    if (res.status === 404) {
        return null;
    }

    if (!res.ok) throw new Error("Failed to fetch post");

    return res.json();
}
