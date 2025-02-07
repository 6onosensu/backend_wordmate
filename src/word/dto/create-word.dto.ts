import { CreateMeaningDto } from "./create-meaning.dto";

export class CreateWordDto {
  word: string;
  audio?: string;
  partOfSpeech: string;
  meanings: CreateMeaningDto[];
}