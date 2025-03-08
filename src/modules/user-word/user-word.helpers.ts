import { LessThanOrEqual, Repository } from 'typeorm';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { User } from "src/modules/user/entities/user.entity";
import { Meaning } from '../meaning/entities/meaning.entity';
import { Status } from '../status/entities/status.entity';
import { PartOfSpeech } from '../part-of-speech/entities/part-of-speech.entity';
import { Word } from '../word/entities/word.entity';
import { CreateUserWordDto } from './dto/create-userWord.dto';
import { UserWord } from './entities/user-word.entity';

export async function getUser(
  userId: number, 
  userRepository: Repository<User>
): Promise<User> {
  const user = await userRepository.findOne({ 
    where: { id: userId } 
  });

  if (!user) {
    throw new NotFoundException(`User with ID ${userId} not found`);
  }

  return user;
}

export async function getOrCreateWord(
  wordText: string, 
  wordRepository: Repository<Word>
): Promise<Word> {
  let word = await wordRepository.findOne({ 
    where: { word: wordText } 
  });

  if (!word) {
    word = wordRepository.create({ word: wordText });
    await wordRepository.save(word);
  }

  return word;
}

export async function getOrCreatePartOfSpeech(
  title: string, 
  partOfSpeechRepository: Repository<PartOfSpeech>
): Promise<PartOfSpeech> {
  let partOfSpeech = await partOfSpeechRepository.findOne({ 
    where: { title } 
  });

  if (!partOfSpeech) {
    partOfSpeech = partOfSpeechRepository.create({ title });
    await partOfSpeechRepository.save(partOfSpeech);
  }

  return partOfSpeech;
}

export async function getOrCreateMeaning(
  word: Word, 
  partOfSpeech: PartOfSpeech, 
  dto: CreateUserWordDto, 
  meaningRepository: Repository<Meaning>
): Promise<Meaning> {
  let meaning = await meaningRepository.findOne({ 
    where: { 
      word: word, 
      partOfSpeech: partOfSpeech 
    } 
  });

  if (!meaning) {
    meaning = meaningRepository.create({
      word,
      partOfSpeech,
      definition: dto.definition,
      example: dto.example,
      synonymMeaningIds: dto.synonymMeaningIds,
      antonymMeaningIds: dto.antonymMeaningIds,
    });

    await meaningRepository.save(meaning);
  }

  return meaning;
}

export async function getStatus(
  title: string, 
  statusRepository: Repository<Status>
): Promise<Status> {
  const status = await statusRepository.findOne({ 
    where: { status: title } 
  });

  if (!status) {
    throw new NotFoundException(`Status "${title}" not found`);
  }

  return status;
}

export async function ensureUserWordDoesNotExist(
  userId: number, 
  meaningId: number, 
  userWordRepository: Repository<UserWord>
): Promise<void> {
  const existingUserWord = await userWordRepository.findOne({
    where: { 
      user: { id: userId }, 
      meaning: { id: meaningId } 
    },
  });

  if (existingUserWord) {
    throw new ConflictException(`UserWord already exists for User ID ${userId} and Meaning ID ${meaningId}`);
  }
}

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
