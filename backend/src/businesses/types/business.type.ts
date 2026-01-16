import { Business } from "generated/prisma/browser";
import { User } from "generated/prisma/client";


export type CreateBusiness = Omit<User, "id"> & {
    name: string;
};

export type UpdateBusiness = Partial<Omit<Business, 'userId'>>;