export class CreateWordDto {
  word: string;
  audio?: string;
  partOfSpeech: string;
  meanings: {
    definition: string;
    synonyms: string[];
    antonyms: string[];
  } [];
}