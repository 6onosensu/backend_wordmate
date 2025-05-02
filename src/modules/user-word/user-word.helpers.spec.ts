import { updateDueStatus } from 'src/modules/user-word/user-word.helpers';
import { UserWord } from 'src/modules/user-word/entities/user-word.entity';
import { Repository } from 'typeorm';

describe('updateDueStatus', () => {
  it('should set due = true if repetitionDate <= now', async () => {
    const mockUser = {
      id: 1,
      repetitionDate: Date.now() - 1000,
      due: false,
    };

    const mockRepo = {
      find: jest.fn().mockResolvedValue([mockUser]),
      save: jest.fn(),
    } as unknown as Repository<UserWord>;

    await updateDueStatus(mockRepo);

    expect(mockRepo.find).toHaveBeenCalled();
    expect(mockUser.due).toBe(true);
    expect(mockRepo.save).toHaveBeenCalledWith([mockUser]);
  });
});
