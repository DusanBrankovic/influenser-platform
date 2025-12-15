import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Role } from "generated/prisma/enums";

export class CreateInfluencerDto {
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    role: Role = Role.INFLUENCER;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    headline: string;
}
