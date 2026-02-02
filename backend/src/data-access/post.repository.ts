import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { CreatePost } from "src/posts/types/post.type";
import { PostAction } from "generated/prisma/enums";
import { SavedPostDto } from "src/posts/dto/saved-post.dto";

@Injectable()
export class PostRepository {
  constructor(private db: PrismaService) {}

  createPost(postDto: CreatePost) {
    return this.db.post.create({
      data: postDto,
    });
  }

  async findPostById(id: number, loggedUserId?: number) {
    const post = await this.db.post.findUnique({
      where: { id },
      include: {
        interactions: { select: { userId: true, action: true } },
      },
    });
    if (!post) {
      return null;
    }
    return {
      ...post,
      numOfLikes: post.interactions.filter((i) => i.action === PostAction.LIKE)
        .length,
      isLikedByUser: post.interactions.some(
        (i) => i.userId === loggedUserId && i.action === PostAction.LIKE,
      ),
      isSavedByUser: post.interactions.some(
        (i) => i.userId === loggedUserId && i.action === PostAction.SAVE,
      ),
    };
  }

  findPostByUserIdAndId(userId: number, id: number) {
    return this.db.post.findUnique({
      where: { id, userId },
    });
  }

  async findPostsByUserId(userId: number, loggedUserId: number) {
    const posts = await this.db.post.findMany({
      where: { userId },
      include: {
        interactions: { select: { userId: true, action: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return posts.map((p) => ({
      ...p,
      numOfLikes: p.interactions.filter((i) => i.action === PostAction.LIKE)
        .length,
      isLikedByUser: p.interactions.some(
        (i) => i.userId === loggedUserId && i.action === PostAction.LIKE,
      ),
      isSavedByUser: p.interactions.some(
        (i) => i.userId === loggedUserId && i.action === PostAction.SAVE,
      ),
    }));
  }

  deletePostById(userId: number, id: number) {
    return this.db.post.deleteMany({
      where: { id, userId },
    });
  }

  updatePostById(id: number, postData: Partial<CreatePost>) {
    return this.db.post.update({
      where: { id },
      data: postData,
    });
  }

  deleteAction(userId: number, postId: number, action: PostAction) {
    return this.db.postInteraction.deleteMany({
      where: { userId, postId, action },
    });
  }

  addAction(userId: number, postId: number, action: PostAction) {
    return this.db.postInteraction.create({
      data: { userId, postId, action },
    });
  }

  async findSavedPostsByUserId(userId: number): Promise<SavedPostDto[]> {
    const posts = await this.db.post.findMany({
      where: {
        interactions: {
          some: {
            userId,
            action: PostAction.SAVE,
          },
        },
      },
      include: {
        user: {
          select: {
            userId: true,
            name: true,
            profilePicture: true,
            description: true,
          },
        },
        interactions: { select: { userId: true, action: true } },
        comments: { select: { id: true, postId: true, userId: true, content: true, createdAt: true, user: { select: { name: true, profilePicture: true } } } },
      },
      orderBy: { createdAt: "desc" },
    });

    return posts.map((post) => ({
      ...post,
      numOfLikes: post.interactions.filter((i) => i.action === PostAction.LIKE)
        .length,
      isLikedByUser: post.interactions.some(
        (i) => i.userId === userId && i.action === PostAction.LIKE,
      ),
      isSavedByUser: post.interactions.some(
        (i) => i.userId === userId && i.action === PostAction.SAVE,
      ),
      comments: post.comments.map((comment) => ({
        id: comment.id,
        postId: comment.postId,
        userId: comment.userId,
        content: comment.content,
        createdAt: comment.createdAt,
        userName: comment.user.name,
        userProfilePicture: comment.user.profilePicture,
      })),
      text: post.text || "",
      user: {
        ...post.user,
        profileUrl: post.user.profilePicture,
      },
    }));
  }
}
