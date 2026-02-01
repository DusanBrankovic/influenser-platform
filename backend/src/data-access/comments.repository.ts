import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { CommentDto } from "src/comments/dto/comment.dto";

@Injectable()
export class CommentsRepository {
  constructor(private db: PrismaService) {}

  createComment(postId: number, userId: number, content: string) {
    return this.db.comment.create({
      data: {
        content,
        postId,
        userId,
        createdAt: new Date(),
      },
    });
  }

  async getAllCommentsForPost(postId: number): Promise<CommentDto[]> {
    const comments = await this.db.comment.findMany({
      where: { postId },
      include: {
        user: {
          select: {
            userId: true,
            name: true,
            profilePicture: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return comments.map(comment => ({
      id: comment.id,
      postId: comment.postId,
      userId: comment.userId,
      content: comment.content,
      createdAt: comment.createdAt,
      userName: comment.user.name,
      userProfilePicture: comment.user.profilePicture,
    }));
  }
}