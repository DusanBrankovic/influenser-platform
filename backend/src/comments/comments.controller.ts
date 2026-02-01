import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { JwtPayload } from "src/auth/dto/credentials.dto";
import { GetUser } from "src/auth/get-user.decorator";

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post("/:postId")
  create(@Param("postId", ParseIntPipe) postId: number, @GetUser() user: JwtPayload, @Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(postId, user.id, createCommentDto);
  }

  @Get(":postId")
  findAllByPostId(@Param("postId", ParseIntPipe) postId: number) {
    return this.commentsService.findAllByPostId(postId);
  }
}
