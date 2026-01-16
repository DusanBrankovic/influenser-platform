import { IsEnum, IsOptional, IsString } from "class-validator";
import { Industry, Value } from "generated/prisma/enums";

export class SearchQueryDto {
    @IsOptional()
    @IsString()
    readonly name?: string;

    @IsOptional()
    @IsEnum(Industry)
    readonly industry?: Industry;

    @IsOptional()
    @IsEnum(Value)
    readonly value?: Value;
}
