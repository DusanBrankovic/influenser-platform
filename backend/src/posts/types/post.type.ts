import { Post } from "generated/prisma/client";

export type CreatePost = Omit<Post, "id">;