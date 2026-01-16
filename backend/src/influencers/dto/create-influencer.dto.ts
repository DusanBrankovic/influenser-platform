import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, IsEnum } from "class-validator";
import { Role } from "generated/prisma/enums";
import { Value } from "generated/prisma/enums";
import { Industry } from "generated/prisma/enums";
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

    @IsOptional()
    @IsArray()
    @IsEnum(Value, {each: true})
    values: Value[]

    @IsOptional()
    @IsArray()
    @IsEnum(Industry, {each: true})
    industries: Industry[]
    

}
