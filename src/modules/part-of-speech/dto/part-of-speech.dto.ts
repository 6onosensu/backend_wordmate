import { IsString, Length } from 'class-validator';

export class CreatePartOfSpeechDto {
  @IsString()
  @Length(1, 50)
  title: string;
}