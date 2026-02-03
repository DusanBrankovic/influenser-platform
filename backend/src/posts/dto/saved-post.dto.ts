import { CommentDto } from "src/comments/dto/comment.dto";

export interface SavedPostDto {
  id: number;
  text: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date | null;
  userId: number;
  isSavedByUser: boolean;
  isLikedByUser: boolean;
  numOfLikes: number;
  user: {
    userId: number;
    name: string;
    profileUrl: string | null;
    description: string | null;
  };
  comments: CommentDto[]
}
