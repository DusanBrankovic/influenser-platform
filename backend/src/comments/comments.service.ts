import { Injectable } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { PostRepository } from "src/data-access/post.repository";
import { InfluencersRepository } from "src/data-access/influencers.repository";
import { CommentsRepository } from "src/data-access/comments.repository";

@Injectable()
export class CommentsService {
  constructor(
    private postRepository: PostRepository,
    private influencer: InfluencersRepository,
    private commentsRepository: CommentsRepository,
  ) {}

  async create(
    postId: number,
    commenterId: number,
    createCommentDto: CreateCommentDto,
  ) {
    const post = await this.postRepository.findPostById(postId);
    if (!post) {
      throw new Error("Post not found");
    }
    const user = await this.influencer.findOne(commenterId);
    if (!user) {
      throw new Error("User not found");
    }
    return this.commentsRepository.createComment(postId, commenterId, createCommentDto.content);
  }

  findAllByPostId(postId: number) {
    return this.commentsRepository.getAllCommentsForPost(postId);
  }
}
