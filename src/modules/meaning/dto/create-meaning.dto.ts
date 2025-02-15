import { IsArray, IsInt, IsOptional, IsString } from "class-validator";

export class CreateMeaningDto {
  @IsInt()
  partOfSpeechId: number;

  @IsInt()
  wordId: number;

  @IsString()
  definition: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  synonymMeaningIds?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  antonymMeaningIds?: string[];
}