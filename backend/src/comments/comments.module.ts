import { Module } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CommentsController } from "./comments.controller";
import { DataAccessModule } from "src/data-access/data-access.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [DataAccessModule, AuthModule],
})
export class CommentsModule {}
