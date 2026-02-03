import { IsOptional, IsString, MaxLength } from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsOptional()
    @MaxLength(500)
    text?: string;
}
