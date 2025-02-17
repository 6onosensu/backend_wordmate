export class FindOneMeaningDto {
  id: number;
  partOfSpeech: string;
  word: string; 
  audio?: string; 
  definition: string;
  synonyms?: string[]; 
  antonyms?: string[]; 
}
