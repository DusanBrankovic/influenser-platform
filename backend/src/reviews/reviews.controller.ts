import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { JwtPayload } from "src/auth/dto/credentials.dto";
import { GetUser } from "src/auth/get-user.decorator";

@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post("/:userId")
  create(@Param("userId", ParseIntPipe) userId: number, @GetUser() user: JwtPayload, @Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(userId, user.id, createReviewDto);
  }

  @Get("/:userId")
  findAllForUser(@Param("userId", ParseIntPipe) userId: number) {
    return this.reviewsService.findAllForUser(userId);
  }
}
