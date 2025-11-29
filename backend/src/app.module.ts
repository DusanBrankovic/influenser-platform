import { Module } from "@nestjs/common";
import { InfluencersModule } from "./influencers/influencers.module";
import { PostsModule } from "./posts/posts.module";
import { CommentsModule } from "./comments/comments.module";
import { ReviewsModule } from "./reviews/reviews.module";
import { AuthModule } from "./auth/auth.module";
import { DataAccessModule } from './data-access/data-access.module';

@Module({
  imports: [
    InfluencersModule,
    PostsModule,
    CommentsModule,
    ReviewsModule,
    AuthModule,
    DataAccessModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
