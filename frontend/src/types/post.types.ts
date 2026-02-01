export type Post = {
  id: number;
  userId: number;
  text: string;
  images: string[];
  createdAt: string;
  numLikes: number;
  likedByLoggedUser: boolean;
  savedByLoggedUser: boolean;
};
