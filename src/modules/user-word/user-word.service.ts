import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserWord } from './entities/user-word.entity';
import { LessThanOrEqual, Repository } from 'typeorm';
import { User } from "src/modules/user/entities/user.entity";
import { CreateUserWordDto } from './dto/create-userWord.dto';
import { Meaning } from '../meaning/entities/meaning.entity';
import { Status } from '../status/entities/status.entity';
import { PartOfSpeech } from '../part-of-speech/entities/part-of-speech.entity';
import { Word } from '../word/entities/word.entity';
import { ensureUserWordDoesNotExist, getOrCreateMeaning, getOrCreatePartOfSpeech, getOrCreateWord, getStatus, getUser } from './user-word.helpers';

@Injectable()
export class UserWordService {
  constructor(
    @InjectRepository(UserWord)
    private readonly userWordRepository: Repository<UserWord>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Meaning)
    private readonly meaningRepository: Repository<Meaning>,

    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>,

    @InjectRepository(PartOfSpeech)
    private readonly partOfSpeechRepository: Repository<PartOfSpeech>,

    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>
  ) {}

  async findAll(): Promise<UserWord[]> {
    return this.userWordRepository.find();
  }

  async findOne(id: number): Promise<UserWord> {
    const userWord = await this.userWordRepository.findOne({ where: { id } });
    if (!userWord) throw new NotFoundException(`UserWord with ID ${id} not found`);
    return userWord;
  }

  async create(dto: CreateUserWordDto): Promise<UserWord> {
    const user = await getUser(dto.userId, this.userRepository);
    const word = await getOrCreateWord(dto.word, this.wordRepository);
    const partOfSpeech = await getOrCreatePartOfSpeech(dto.partOfSpeech, this.partOfSpeechRepository);
    const meaning = await getOrCreateMeaning(word, partOfSpeech, dto, this.meaningRepository);
    const status = await getStatus("To Explore", this.statusRepository);

    await ensureUserWordDoesNotExist(user.id, meaning.id, this.userWordRepository);

    return this.userWordRepository.save(this.userWordRepository.create({
      user, meaning, status, repetitionDate: new Date(), due: false, repetitionCount: 0,
    }));
  }

  async delete(id: number): Promise<void> {
    const userWord = await this.findOne(id);
    await this.userWordRepository.remove(userWord);
  }

  async findByUserAndStatus(userId: number, statusId: number): Promise<UserWord[]> {
    const userWordList = await this.userWordRepository.find({
      where: { 
        user: { id: userId }, 
        status: { id: statusId } 
      },
      relations: ['user', 'meaning', 'status'],
    });
  
    if (userWordList.length === 0) {
      throw new NotFoundException(`No UserWords found for User ID ${userId} with Status ID ${statusId}`);
    }
  
    return userWordList;
  }

  async findWordsToRepeat(userId: number): Promise<UserWord[]> {
    const now = new Date();

    return this.userWordRepository.find({
      where: {
        user: { id: userId },
        status: { id: 3},
        repetitionDate: LessThanOrEqual(now),
      },
      relations: ['meaning', 'status']
    })
  }
}
