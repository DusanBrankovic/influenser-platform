import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { CreatePost } from "src/posts/types/post.type";

@Injectable()
export class PostRepository {
  constructor(private db: PrismaService) {}

  createPost(postDto: CreatePost) {
    return this.db.post.create({
      data: postDto,
    });
  }

  findPostById(id: number) {
    return this.db.post.findUnique({
      where: { id },
    });
  }

  findPostByUserIdAndId(userId: number, id: number) {
    return this.db.post.findUnique({
      where: { id, userId },
    });
  }

  findPostsByUserId(userId: number) {
    return this.db.post.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
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
}
