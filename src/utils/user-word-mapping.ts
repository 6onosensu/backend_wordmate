import { transformMeaningToDto } from "src/common/transformers/meaning.transformer";
import { UserWord } from "src/modules/user-word/entities/user-word.entity";
import { MeaningService } from "src/modules/meaning/meaning.service";
import { UserWordWithMeaningDto } from "src/modules/user-word/dto/user-word-with-meaning.dto";

export const mapUserWordToDto = async (
  userWord: UserWord,
  meaningService: MeaningService
): Promise<UserWordWithMeaningDto> => {
  const transformedMeaning = await transformMeaningToDto(userWord.meaning, meaningService);
  return {
    id: userWord.id,
    repetitionCount: userWord.repetitionCount,
    repetitionDate: userWord.repetitionDate,
    intervalRepetitions: userWord.intervalRepetitions,
    due: userWord.due,
    status: userWord.status,
    meaning: transformedMeaning,
  };
};