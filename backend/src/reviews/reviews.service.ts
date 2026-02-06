import { Injectable } from "@nestjs/common";
import { CreateReviewDto } from "./dto/create-review.dto";
import { ReviewsRepository } from "src/data-access/reviews.repository";

@Injectable()
export class ReviewsService {
  constructor(private reviewsRepository: ReviewsRepository) {}

  create(userId: number, reviewerId: number, createReviewDto: CreateReviewDto) {
    return this.reviewsRepository.createReview(userId, reviewerId, createReviewDto);
  }

  findAllForUser(userId: number) {
    return this.reviewsRepository.getAllReviewsForUser(userId);
  }
}
