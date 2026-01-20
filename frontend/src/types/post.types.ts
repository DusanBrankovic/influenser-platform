export type Post = {
  id: number;
  userId: number;
  text: string;
  images: string[];
  createdAt: string;
  numLikes: number;
  numComments: number;
  likedByLoggedUser: boolean;
  savedByLoggedUser: boolean;
};
