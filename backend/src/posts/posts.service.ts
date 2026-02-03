import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { BACKBLAZE } from "src/data-access/bucket/consts";
import { BucketService } from "src/data-access/bucket/bucket.service";
import { CreatePost } from "./types/post.type";
import { PostRepository } from "src/data-access/post.repository";
import { PostAction } from "generated/prisma/enums";

@Injectable()
export class PostsService {
  constructor(
    @Inject(BACKBLAZE) private readonly bucketService: BucketService,
    private readonly postRepository: PostRepository,
  ) {}
  async create(userId: number, createPostDto: CreatePostDto, files: Express.Multer.File[]) {
    if (!createPostDto.text?.trim() && (!files || files?.length === 0)) {
      throw new BadRequestException("Post must have text or images");
    }
    let imageUrls: { dbUrl: string; signedUrl: string }[] = [];
    if (files?.length > 0) {
      if (files.some(file => !file.mimetype.startsWith("image/"))) {
        throw new BadRequestException("Only image files are allowed");
      }
      imageUrls = await this.bucketService.uploadFiles(files, userId);
    }
    const postData: CreatePost = {
      userId,
      text: createPostDto.text || null,
      images: imageUrls.map(urlObj => urlObj.dbUrl),
      createdAt: new Date(),
      updatedAt: null,
    }
    const newPost = await this.postRepository.createPost(postData);
    return {
      ...newPost,
      images: imageUrls.map(urlObj => urlObj.signedUrl),
    }
  }

  async findAllForUser(userId: number, loggedUserId: number) {
    const posts = await this.postRepository.findPostsByUserId(userId, loggedUserId);
    for (const post of posts) {
      post.images = await Promise.all(
        post.images.map((dbUrl) => this.bucketService.getFile(dbUrl, 60 * 60))
      );
    }
    return posts;
  }

  async findOne(id: number, loggedUserId: number) {
    const post = await this.postRepository.findPostById(id, loggedUserId);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    const imageUrls = await Promise.all(
      post.images.map((dbUrl) => this.bucketService.getFile(dbUrl, 60 * 60))
    );
    return {
      ...post,
      images: imageUrls,
    };
    
  }

  async update(userId: number, id: number, updatePostDto: UpdatePostDto, newImages: Express.Multer.File[]) {
    const post = await this.postRepository.findPostByUserIdAndId(userId, id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  
    if (updatePostDto.existingImageUrls) {
      const imagesToDelete = post.images.filter((dbUrl) => {
        const imageName = dbUrl.split("/").pop() || "";
        return !updatePostDto.existingImageUrls?.some((existingUrl) => existingUrl.includes(imageName));
      });
      const deletePromises = imagesToDelete.map(async (dbUrl) => {
        await this.bucketService.deleteFile(dbUrl);
      });
      await Promise.all(deletePromises);
      post.images = post.images.filter((dbUrl) => {
        const imageName = dbUrl.split("/").pop() || "";
        return updatePostDto.existingImageUrls?.some((existingUrl) => existingUrl.includes(imageName));
      });
    }

    if (newImages.length > 0) {
      const uploadedImages = await this.bucketService.uploadFiles(newImages, userId);
      post.images.push(...uploadedImages.map((urlObj) => urlObj.dbUrl));
    }

    post.text = updatePostDto.text ?? post.text;
    post.updatedAt = new Date();

    await this.postRepository.updatePostById(post.id, post);
    return post;
  }

  async remove(userId: number, id: number) {
    const post = await this.postRepository.findPostByUserIdAndId(userId, id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    const deletePromises = post.images.map(async (dbUrl) => {
      await this.bucketService.deleteFile(dbUrl);
    });

    await Promise.all(deletePromises);

    await this.postRepository.deletePostById(userId, id);
    return { message: `Post with ID ${id} deleted successfully` };
  }

  async postAction(postId: number, userId: number, action: PostAction) {
    const post = await this.postRepository.findPostById(postId, userId);
    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    switch (action) {
      case PostAction.LIKE:
        if (post.isLikedByUser) {
          await this.postRepository.deleteAction(userId, postId, PostAction.LIKE);
        } else {
          await this.postRepository.addAction(userId, postId, PostAction.LIKE);
        }
        break;
      case PostAction.SAVE:
        if (post.isSavedByUser) {
          await this.postRepository.deleteAction(userId, postId, PostAction.SAVE);
        } else {
          await this.postRepository.addAction(userId, postId, PostAction.SAVE);
        }
        break;
      default:
        throw new BadRequestException("Invalid action");
    }

    return this.findOne(postId, userId);
  }

  async getSavedPosts(loggedUserId: number) {
    const posts = await this.postRepository.findSavedPostsByUserId(loggedUserId);
    for (const post of posts) {
      post.images = await Promise.all(
        post.images.map((dbUrl) => this.bucketService.getFile(dbUrl, 60 * 60))
      );
    }
    return posts;
  }
}
