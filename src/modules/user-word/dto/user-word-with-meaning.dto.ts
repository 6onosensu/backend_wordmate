import { FindOneMeaningDto } from "src/common/dto/findOne-meaning.dto";
import { Status } from "src/modules/status/entities/status.entity";

export interface UserWordWithMeaningDto {
  id: number;
  repetitionDate: Date;
  due: boolean;
  repetitionCount: number;
  intervalRepetitions: number;
  status: Status;
  meaning: FindOneMeaningDto;
}
