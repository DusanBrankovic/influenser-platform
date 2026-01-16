import { PartialType } from "@nestjs/mapped-types";
import { CreateInfluencerDto } from "./create-influencer.dto";
import { IsBoolean, IsInt, IsOptional, IsString, Min, IsArray, IsEnum } from "class-validator";
import { Value, Industry } from "generated/prisma/enums";
export class UpdateInfluencerDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  headline?: string;

  @IsOptional()
  @IsArray()
  @IsEnum(Value, {each: true})
  values: Value[]

  @IsOptional()
  @IsArray()
  @IsEnum(Industry, {each: true})
  industries?: Industry[];
}

