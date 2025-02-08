import { CreateMeaningDto } from "../meaning/create-meaning.dto";

export class CreateWordDto {
  word: string;
  audio?: string;
  partOfSpeech: string;
  meanings: CreateMeaningDto[];
}