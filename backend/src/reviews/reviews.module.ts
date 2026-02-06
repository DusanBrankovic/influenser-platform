import { Module } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { ReviewsController } from "./reviews.controller";
import { DataAccessModule } from "src/data-access/data-access.module";

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService],
  imports: [DataAccessModule],
})
export class ReviewsModule {}
