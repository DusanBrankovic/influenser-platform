import { Module } from "@nestjs/common";
import { InfluencersModule } from "./influencers/influencers.module";
import { PostsModule } from "./posts/posts.module";
import { CommentsModule } from "./comments/comments.module";
import { ReviewsModule } from "./reviews/reviews.module";
import { AuthModule } from "./auth/auth.module";
import { DataAccessModule } from "./data-access/data-access.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./auth/auth.guard";
import { RolesGuard } from "./auth/roles.guard";
import { ConfigModule } from "@nestjs/config";
import { BusinessesModule } from './businesses/businesses.module';

@Module({
  imports: [
    InfluencersModule,
    PostsModule,
    CommentsModule,
    ReviewsModule,
    AuthModule,
    DataAccessModule,
    ConfigModule.forRoot({ isGlobal: true }),
    BusinessesModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
