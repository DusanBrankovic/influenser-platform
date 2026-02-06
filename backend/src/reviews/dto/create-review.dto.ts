import { IsNumber, IsPositive, IsString, IsNotEmpty } from "class-validator";

export class CreateReviewDto {
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    rating: number;
    @IsString()
    comment: string;
}
