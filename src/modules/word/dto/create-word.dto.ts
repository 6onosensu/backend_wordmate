import { IsOptional, IsString, Length } from "class-validator";

export class CreateWordDto {
  @IsString()
  @Length(1, 255)
  word: string;

  @IsOptional()
  @IsString()
  audio?: string;
}