import { PartialType } from "@nestjs/mapped-types";
import { CreatePostDto } from "./create-post.dto";
import { IsArray, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsOptional()
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (typeof value === "string" && value.trim() !== "") {
      try {
        return JSON.parse(value);
      } catch {
        return [];
      }
    }
    return [];
  })
  @IsArray() 
  @IsString({ each: true })
  existingImageUrls?: string[];
}
