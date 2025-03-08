import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserWord } from './entities/user-word.entity';
import { Repository } from 'typeorm';
import { User } from "src/modules/user/entities/user.entity";
import { CreateUserWordDto } from './dto/create-userWord.dto';
import { Status } from '../status/entities/status.entity';
import { PartOfSpeech } from '../part-of-speech/entities/part-of-speech.entity';
import { Word } from '../word/entities/word.entity';
import { 
  calculateNextRepetitionDate, 
  ensureUserWordDoesNotExist, 
  getOrCreateMeaning, 
  getOrCreatePartOfSpeech, 
  getOrCreateWord, 
  getStatus, 
  getUser, 
  updateDueStatus 
} from './user-word.helpers';
import { MeaningService } from '../meaning/meaning.service';

@Injectable()
export class UserWordService implements OnModuleInit {
  constructor(
    @InjectRepository(UserWord)
    private readonly userWordRepository: Repository<UserWord>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>,

    @InjectRepository(PartOfSpeech)
    private readonly partOfSpeechRepository: Repository<PartOfSpeech>,

    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
    
    private readonly meaningService: MeaningService
  ) {}

  onModuleInit() {
    setInterval(() => {
      updateDueStatus(this.userWordRepository);
    }, 24 * 60 * 60 * 1000);
  }

  async findAll(): Promise<UserWord[]> {
    return this.userWordRepository.find();
  }

  async findOne(id: number, userId: number): Promise<UserWord> {
    const userWord = await this.userWordRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!userWord) throw new NotFoundException(`UserWord with ID ${id} not found for this user`);
    return userWord;
  }

  async create(dto: CreateUserWordDto): Promise<UserWord> {
    const user = await getUser(dto.userId, this.userRepository);
    const word = await getOrCreateWord(dto.word, this.wordRepository);
    const partOfSpeech = await getOrCreatePartOfSpeech(dto.partOfSpeech, this.partOfSpeechRepository);
    const meaning = await getOrCreateMeaning(word, partOfSpeech, dto, this.meaningService);
    const status = await getStatus("To Explore", this.statusRepository);

    await ensureUserWordDoesNotExist(user.id, meaning.id, this.userWordRepository);

    return this.userWordRepository.save(this.userWordRepository.create({
      user, meaning, status,
    }));
  }

  async update(id: number, 
    repetitionCount: number, 
    intervalRepetitions: number,
    userId: number
  ): Promise<UserWord> {

    const userWord = await this.findOne(id, userId);
  
    userWord.repetitionCount = Math.min(repetitionCount, 4);
  
    if (userWord.repetitionCount === 4) {
      userWord.repetitionDate = calculateNextRepetitionDate(intervalRepetitions);
    }
  
    userWord.due = userWord.repetitionDate ? userWord.repetitionDate <= new Date() : false;
  
    return this.userWordRepository.save(userWord);
  }

  async delete(id: number, userId: number): Promise<void> {
    const userWord = await this.findOne(id, userId);
    await this.userWordRepository.remove(userWord);
  }

  async findByUserAndStatus(
    userId: number, 
    status: string, 
    isDue: boolean
  ): Promise<UserWord[]> {
    const statusEntity = await getStatus(
      status, 
      this.statusRepository
    );

    if (!statusEntity) {
      throw new NotFoundException(`Status "${status}" not found`);
    }

    const userWordList = await this.userWordRepository.find({
      where: { 
        user: { id: userId }, 
        status: { id: statusEntity.id },
        due: isDue,
      },
      relations: ['user', 'meaning', 'status'],
    });
  
    if (userWordList.length === 0) {
      throw new NotFoundException(`No UserWords found for User ID ${userId} with Status ID ${status}`);
    }
  
    return userWordList;
  }
}
