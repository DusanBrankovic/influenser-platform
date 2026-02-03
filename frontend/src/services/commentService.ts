import { getAccessToken } from "@/auth/authStore";
import type { CommentDto } from "@/types/comment.types";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

function authHeaders(): Record<string, string> {
  const token = getAccessToken();

  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getCommentsForPost(postId: number): Promise<CommentDto[]> {

    const res = await fetch(`${apiUrl}/comments/${postId}`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            ...authHeaders(),
        },
    });
    if (!res.ok) throw new Error("Failed to fetch comments for a post");
    return res.json();
}

export async function addComment({postId, content}: {postId: number, content: string}): Promise<CommentDto> {
    const res = await fetch(`${apiUrl}/comments/${postId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...authHeaders(),
        },
        body: JSON.stringify({ content }),
    });

    if (!res.ok) throw new Error("Failed to create comment");
    return res.json();
}

