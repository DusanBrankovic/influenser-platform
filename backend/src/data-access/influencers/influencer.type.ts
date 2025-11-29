import { User } from "@prisma/client";

export type CreateInfluencer = Omit<User, "id">;