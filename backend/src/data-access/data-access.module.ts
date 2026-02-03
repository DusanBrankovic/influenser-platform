import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { InfluencersRepository } from "./influencers.repository";
import { UsersRepository } from "./users.repository";
import { BACKBLAZE } from "./bucket/consts";
import { BackBlazeService } from "./bucket/backblaze.service";
import { PostRepository } from "./post.repository";
import { BusinessRepository } from "./businesses.repository";
import { DataRepository } from "./data.repository";
import { CommentsRepository } from "./comments.repository";

@Module({
  providers: [
    PrismaService,
    InfluencersRepository,
    UsersRepository,
    BusinessRepository,
    DataRepository,
    PostRepository,
    CommentsRepository,
    {
      provide: BACKBLAZE,
      useClass: BackBlazeService,
    },
  ],
  exports: [
    BACKBLAZE,
    InfluencersRepository,
    UsersRepository,
    PostRepository,
    BusinessRepository,
    DataRepository,
    CommentsRepository,
  ],
})
export class DataAccessModule {}
