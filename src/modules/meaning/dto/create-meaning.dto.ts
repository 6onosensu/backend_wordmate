import { IsArray, IsOptional, IsString } from "class-validator";

export class CreateMeaningDto {
  @IsString()
  partOfSpeech: string;

  @IsString()
  word: string;

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
}