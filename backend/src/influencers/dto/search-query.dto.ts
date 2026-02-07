import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { Industry, Value } from "generated/prisma/enums";
import { Transform, Type } from "class-transformer";

export class SearchQueryDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (value == null) return undefined;
    return Array.isArray(value) ? value : [value];
  })
  @IsArray()
  @IsEnum(Industry, { each: true })
  readonly industry?: Industry[];

  @IsOptional()
  @Transform(({ value }) => {
    if (value == null) return undefined;
    return Array.isArray(value) ? value : [value];
  })
  @IsArray()
  @IsEnum(Value, { each: true })
  readonly value?: Value[];

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly experience_range?: number;
}