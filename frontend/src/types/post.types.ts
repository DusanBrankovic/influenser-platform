import type { CommentDto } from "./comment.types";

export type Post = {
  id: number;
  userId: number;
  text: string;
  images: string[];
  createdAt: string;
  numOfLikes: number;
  isLikedByUser: boolean;
  isSavedByUser: boolean;
};

export interface SavedPost {
  id: number;
  text: string;
  images: string[];
  createdAt: string;
  userId: number;
  user: {
    userId: number;
    name: string;
    profileUrl: string;
    description: string | null;
  };
  isSavedByUser: boolean;
  isLikedByUser: boolean;
  numOfLikes: number;
  comments: CommentDto[];
}
