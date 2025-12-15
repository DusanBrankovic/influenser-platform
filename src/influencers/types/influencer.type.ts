import { Influencer } from "generated/prisma/browser";
import { User } from "generated/prisma/client";


export type CreateInfluencer = Omit<User, "id"> & {
    name: string;
    headline?: string;
};

export type UpdateInfluencer = Partial<Omit<Influencer, 'userId'>>;