import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Industry, Value } from "generated/prisma/enums";

export class SearchQueryDto {
    @IsOptional()
    @IsString()
    readonly name?: string;

    @IsOptional()
    @IsArray()
    @IsEnum(Industry, {each:true})
    readonly industry?: Industry[];

    @IsOptional()
    @IsArray()
    @IsEnum(Value, {each:true})
    readonly value?: Value[];
}
