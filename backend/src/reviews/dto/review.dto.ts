export class ReviewDto {
  id: number;
  rating: number;
  comment: string;
  createdAt: Date;
  userId: number;
  reviewerId: number;
  reviewerName: string;
  reviewerProfilePicture: string;
}
