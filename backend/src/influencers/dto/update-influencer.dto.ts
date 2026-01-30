import { PartialType } from "@nestjs/mapped-types";
import { CreateInfluencerDto } from "./create-influencer.dto";
import { IsBoolean, IsInt, IsOptional, IsString, Min, IsArray, IsEnum, IsNumber, IsEmail, IsPhoneNumber } from "class-validator";
import { Value, Industry } from "generated/prisma/enums";
export class UpdateInfluencerDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  headline?: string;

  @IsOptional()
  @IsNumber()
  experience?: number;

  @IsOptional()
  @IsArray()
  @IsEnum(Value, {each: true})
  values: Value[]

  @IsOptional()
  @IsArray()
  @IsEnum(Industry, {each: true})
  industries?: Industry[];
  
  @IsOptional()
  @IsString()
  description?: string;
  
  @IsOptional()
  @IsString()
  nametag?: string;
  
  @IsOptional()
  @IsArray()
  @IsEmail({}, {each: true})
  contactMail?: string[];
  
  @IsOptional()
  @IsArray()
  @IsPhoneNumber(undefined, { each: true })
  contactPhone?: string[];
}

