import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Put,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { FilesInterceptor } from "@nestjs/platform-express";
import { GetUser } from "src/auth/get-user.decorator";
import { JwtPayload } from "src/auth/dto/credentials.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { PostSchema } from "./schemas/post.schema";
import { PostAction, Role } from "generated/prisma/enums";
import { Roles } from "src/auth/roles.decorator";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({
    summary: "Create a new post",
    description: "This endpoint creates a new post with the provided details.",
  })
  @ApiResponse({
    status: 201,
    description: "Successfully created",
    content: {
      "application/json": {
        schema: PostSchema,
      },
    },
  })
  @Post()
  @Roles(Role.INFLUENCER)
  @UseInterceptors(FilesInterceptor("images"))
  create(
    @GetUser() user: JwtPayload,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postsService.create(+user.id, createPostDto, files);
  }

  @ApiOperation({
    summary: "Get all posts for the user",
    description: "This endpoint retrieves all posts created by the user.",
  })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved",
    content: {
      "application/json": {
        schema: {
          type: "array",
          items: PostSchema,
        },
      },
    },
  })
  @Get("/influencer/:id")
  findAllForUser(@Param("id") id: string, @GetUser() user: JwtPayload) {
    return this.postsService.findAllForUser(+id, +user.id);
  }

  @ApiOperation({
    summary: "Get a post",
    description: "This endpoint retrieves a post by its ID.",
  })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved",
    content: {
      "application/json": {
        schema: PostSchema,
      },
    },
  })
  @Get(":id")
  findOne(@Param("id") id: string, @GetUser() user: JwtPayload) {
    return this.postsService.findOne(+id, +user.id);
  }


  @ApiOperation({
    summary: "Like post",
    description: "This endpoint allows a user to like a post.",
  })
  @ApiResponse({
    status: 200,
    description: "Successfully liked the post",
    content: {
      "application/json": {
        schema: PostSchema,
      },
    },
  })
  @Post(":id/like")
  likePost(@Param("id") id: string, @GetUser() user: JwtPayload) {
    return this.postsService.postAction(+id, +user.id, PostAction.LIKE);
  }

  @ApiOperation({
    summary: "Save post",
    description: "This endpoint allows a user to save post.",
  })
  @ApiResponse({
    status: 200,
    description: "Successfully saved post",
    content: {
      "application/json": {
        schema: PostSchema,
      },
    },
  })
  @Post(":id/save")
  savePost(@Param("id") id: string, @GetUser() user: JwtPayload) {
    return this.postsService.postAction(+id, +user.id, PostAction.SAVE);
  }



  @ApiOperation({
    summary: "Edit post",
    description: "This endpoint edits a post by its ID.",
  })
  @ApiResponse({
    status: 200,
    description: "Successfully edited",
    content: {
      "application/json": {
        schema: PostSchema,
      },
    },
  })
  @Put(":id")
  @Roles(Role.INFLUENCER)
  @UseInterceptors(FilesInterceptor("newImages"))
  update(
    @Param("id") id: string,
    @Body() updatePostDto: UpdatePostDto,
    @GetUser() user: JwtPayload,
    @UploadedFiles() newImages: Express.Multer.File[],
  ) {
    return this.postsService.update(+user.id, +id, updatePostDto, newImages);
  }

  @ApiOperation({
    summary: "Delete a post",
    description: "This endpoint deletes a post by its ID.",
  })
  @ApiResponse({
    status: 200,
    description: "Successfully deleted",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: { type: "string", example: "Post deleted successfully." },
          },
        },
      },
    },
  })
  @Delete(":id")
  remove(@GetUser() user: JwtPayload, @Param("id") id: string) {
    return this.postsService.remove(+user.id, +id);
  }
}
