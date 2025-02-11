import { CreateMeaningDto } from "src/modules/meaning/dto/create-meaning.dto";

export class CreateWordDto {
  word: string;
  audio?: string;
  partOfSpeech: string;
  meanings: CreateMeaningDto[];
}