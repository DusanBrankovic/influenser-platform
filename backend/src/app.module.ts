import { Module } from "@nestjs/common";
import { InfluencersModule } from "./influencers/influencers.module";
import { PostsModule } from "./posts/posts.module";
import { CommentsModule } from "./comments/comments.module";
import { ReviewsModule } from "./reviews/reviews.module";
import { AuthModule } from "./auth/auth.module";
import { DataAccessModule } from './data-access/data-access.module';
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth/auth.guard";

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
  providers: [
    {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
  ],
})
export class AppModule {}
