import { FindOneMeaningDto } from "../../../common/dto/findOne-meaning.dto";
import { Status } from "../../status/entities/status.entity";

export interface UserWordWithMeaningDto {
  id: number;
  repetitionDate: Date;
  due: boolean;
  repetitionCount: number;
  intervalRepetitions: number;
  status: Status;
  meaning: FindOneMeaningDto;
}
