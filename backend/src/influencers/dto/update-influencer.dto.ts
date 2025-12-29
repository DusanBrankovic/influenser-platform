import { PartialType } from "@nestjs/mapped-types";
import { CreateInfluencerDto } from "./create-influencer.dto";
import { IsBoolean, IsInt, IsOptional, IsString, Min } from "class-validator";

export class UpdateInfluencerDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  headline?: string;

}

