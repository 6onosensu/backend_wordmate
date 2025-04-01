import { LessThanOrEqual, Repository } from 'typeorm';
import { UserWord } from './entities/user-word.entity';

export async function updateDueStatus(
  userWordRepository: Repository<UserWord>
): Promise<void> {
  const wordsToUpdate = await userWordRepository.find({
    where: { 
      repetitionDate: LessThanOrEqual(new Date()) 
    }
  });

  for (const word of wordsToUpdate) {
    word.due = true;
  }

  await userWordRepository.save(wordsToUpdate);
}

export function calculateNextRepetitionDate(intervalRepetitions: number): Date {
  const intervals = [1, 3, 7, 14, 30];
  const daysToAdd = intervals[Math.min(intervalRepetitions, intervals.length - 1)];

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + daysToAdd);

  return nextDate;
}
