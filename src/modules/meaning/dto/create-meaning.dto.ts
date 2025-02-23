import { IsArray, IsOptional, IsString } from "class-validator";

export class CreateMeaningDto {
  @IsString()
  partOfSpeech: string;

  @IsString()
  word: string;

  @IsOptional()
  @IsString()
  audio?: string;

  @IsString()
  definition: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  synonyms?: string[]; 

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  antonyms?: string[]; 

  @IsOptional()
  @IsString()
  example?: string;
}