export interface CreateReviewDto {
    userId: number;
    rating: number;
    comment?: string;
}


export interface ReviewDto {
    id: number;
    rating: number;
    comment: string;
    createdAt: string;
    userId: number;
    reviewerId: number;
    reviewerName: string;
    reviewerProfilePicture: string;
}