import { Repository } from 'typeorm';
import { updateDueStatus } from 'src/modules/user-word/user-word.helpers';
import { UserWordService } from 'src/modules/user-word/user-word.service';
import { UserWord } from 'src/modules/user-word/entities/user-word.entity';
import { Status } from 'src/modules/status/entities/status.entity';

jest.mock('./user-word.helpers', () => ({
  updateDueStatus: jest.fn().mockResolvedValue(undefined),
}));

describe('UserWordService', () => {
  let service: UserWordService;

  const mockUserWordRepo = {} as Repository<UserWord>;
  const mockStatusRepo = {} as Repository<Status>;
  const mockMeaningService = {} as any;
  const mockUserService = {} as any;
  const mockWordService = {} as any;
  const mockPartOfSpeechService = {} as any;
  const mockStatusService = {} as any;

  beforeEach(() => {
    jest.useFakeTimers();

    service = new UserWordService(
      mockUserWordRepo,
      mockStatusRepo,
      mockMeaningService,
      mockUserService,
      mockWordService,
      mockPartOfSpeechService,
      mockStatusService
    );
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.resetAllMocks();
  });

  it('should call updateDueStatus every hour', () => {
    service.onModuleInit();

    jest.advanceTimersByTime(60 * 60 * 1000);

    expect(updateDueStatus).toHaveBeenCalledWith(mockUserWordRepo);
  });
});
