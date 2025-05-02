import { MeaningService } from 'src/modules/meaning/meaning.service';
import { FindOneMeaningDto } from 'src/common/dto/findOne-meaning.dto';
import { Meaning } from 'src/modules/meaning/entities/meaning.entity';

export const transformMeaningToDto = async (
  meaning: Meaning,
  meaningService: MeaningService
): Promise<FindOneMeaningDto> => {
  const parseIds = (ids: any): number[] => {
    if (!ids) return [];
    if (Array.isArray(ids)) return ids;
    if (typeof ids === 'string') return JSON.parse(ids);
    return ids;
  };
  return {
    id: meaning.id,
    partOfSpeech: meaning.partOfSpeech.title,
    word: meaning.word.word,
    audio: meaning.word.audio,
    definition: meaning.definition,
    synonyms: await meaningService.getWordsByIds(parseIds(meaning.synonymMeaningIds)),
    antonyms: await meaningService.getWordsByIds(parseIds(meaning.antonymMeaningIds)),
    example: meaning.example,
  };
};
