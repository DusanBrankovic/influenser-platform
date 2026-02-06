import { getAccessToken } from "@/auth/authStore";
import type { CreateReviewDto, ReviewDto } from "@/types/review.types";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

function authHeaders(): Record<string, string> {
  const token = getAccessToken();

  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getUserReviews(userId: number): Promise<ReviewDto[]> {

    const res = await fetch(`${apiUrl}/reviews/${userId}`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            ...authHeaders(),
        },
    });
    if (!res.ok) throw new Error("Failed to fetch reviews");
    return res.json();
}

export async function leaveReview(data: CreateReviewDto): Promise<void> {
    console.log("Submitting review:", data);
    const res = await fetch(`${apiUrl}/reviews/${data.userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...authHeaders(),
        },
        body: JSON.stringify({ rating: data.rating, comment: data.comment }),
    });
    if (!res.ok) throw new Error("Failed to create review");
    return res.json();
}