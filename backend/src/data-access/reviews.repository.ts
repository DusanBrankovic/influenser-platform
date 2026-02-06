import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { CommentDto } from "src/comments/dto/comment.dto";
import { CreateReviewDto } from "src/reviews/dto/create-review.dto";
import { ReviewDto } from "src/reviews/dto/review.dto";

@Injectable()
export class ReviewsRepository {
  constructor(private db: PrismaService) {}

  createReview(userId: number, reviewerId: number, data: CreateReviewDto) {
    return this.db.review.create({
      data: {
        ...data,
        userId,
        reviewerId,
        createdAt: new Date(),
      },
    });
  }

  async getAllReviewsForUser(userId: number): Promise<ReviewDto[]> {
    const reviews = await this.db.review.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        reviewer: {
          select: {
            id: true,
            influencer: { select: { name: true, profilePicture: true } },
            business: { select: { name: true } },
          },
        },
      },
    });

    return reviews.map((review) => ({
      id: review.id,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      userId,
      reviewerId: review.reviewerId,
      reviewerName: review.reviewer.influencer?.name || review.reviewer.business?.name || "Unknown",
      reviewerProfilePicture: review.reviewer.influencer?.profilePicture || '',
    }));
  }
}