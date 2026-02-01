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
