import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { DataAccessModule } from "src/data-access/data-access.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [DataAccessModule, AuthModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
