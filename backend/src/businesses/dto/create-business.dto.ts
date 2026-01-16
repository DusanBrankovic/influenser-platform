import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Role } from "generated/prisma/enums";

export class CreateBusinessDto {
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    role: Role = Role.BUSINESS;

    @IsNotEmpty()
    @IsString()
    name: string;
}