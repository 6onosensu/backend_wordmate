import { IsInt, IsString, IsOptional } from "class-validator";

export class CreateUserWordDto {
  @IsInt()
  userId: number;

  @IsString()
  word: string;

  @IsOptional()
  @IsString()
  audio?: string;

  @IsString()
  partOfSpeech: string;

  @IsString()
  definition: string; 

  @IsOptional()
  @IsString()
  example?: string; 

  @IsOptional()
  synonymMeaningIds?: number[];

  @IsOptional()
  antonymMeaningIds?: number[];
}
