import { ConflictException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserWord } from './entities/user-word.entity';
import { Repository } from 'typeorm';
import { CreateUserWordDto } from './dto/create-userWord.dto';
import { Status } from '../status/entities/status.entity';
import { calculateNextRepetitionDate, updateDueStatus } from './user-word.helpers';
import { MeaningService } from '../meaning/meaning.service';
import { UserService } from '../user/user.service';
import { WordService } from '../word/word.service';
import { PartOfSpeechService } from '../part-of-speech/partofspeech.service';
import { StatusService } from '../status/status.service';
import { CreateMeaningDto } from '../meaning/dto/create-meaning.dto';

@Injectable()
export class UserWordService implements OnModuleInit {
  constructor(
    @InjectRepository(UserWord)
    private readonly userWordRepository: Repository<UserWord>,
    
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
    
    private readonly meaningService: MeaningService,
    private readonly userService: UserService, 
    private readonly wordService: WordService,
    private readonly partOfSpeechService: PartOfSpeechService,
    private readonly statusService: StatusService, 
  ) {}

  onModuleInit() {
    setInterval(() => {
      updateDueStatus(this.userWordRepository);
    }, 24 * 60 * 60 * 1000);
  }
  
  async findByUserAndStatus(
    userId: number, 
    status: string, 
    isDue: boolean
  ): Promise<UserWord[]> {
    const decodedStatus = decodeURIComponent(status);
    const statusEntity = await this.statusRepository.findOne({ 
      where: { status: decodedStatus } 
    });

  if (!statusEntity) {
    throw new NotFoundException(`Status "${status}" not found`);
  }

    const userWordList = await this.userWordRepository.find({
      where: { 
        user: { id: userId }, 
        status: { id: statusEntity.id },
        due: isDue,
      },
      relations: [
        'user', 
        'meaning', 
        'meaning.word', 
        'meaning.partOfSpeech', 
        'status'
      ],
    });
  
    if (userWordList.length === 0) {
      throw new NotFoundException(`No UserWords found for User ID ${userId} with Status ID ${status}`);
    }
  
    return userWordList;
  }

  async findOne(id: number, userId: number): Promise<UserWord> {
    const userWord = await this.userWordRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!userWord) throw new NotFoundException(`UserWord with ID ${id} not found for this user`);
    return userWord;
  }

  async create(dto: CreateUserWordDto): Promise<UserWord> {
    const user = await this.userService.findOne(dto.userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${dto.userId} not found`);
    }

    const createWordDto = { word: dto.word, audio: dto.audio, };
    const word = await this.wordService.findOrCreateWord(createWordDto);
    
    const partOfSpeech = await this.partOfSpeechService.findOrCreatePartOfSpeech(dto.partOfSpeech);
    
    const createMeaningDto: CreateMeaningDto = {
        word: word.word, 
        audio: dto.audio || undefined,
        partOfSpeech: partOfSpeech.title,
        definition: dto.definition,
        example: dto.example,
        synonyms: dto.synonyms || [], 
        antonyms: dto.antonyms || [],
      };
    const meaning = await this.meaningService.create(createMeaningDto);
    
    const status = await this.statusService.findStatusByTitle("To Explore");
    
    await this.ensureUserWordDoesNotExist(user.id, meaning.id);

    const userWord = this.userWordRepository.create({
      user, meaning, status,
    })
    return this.userWordRepository.save(userWord);
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

  async ensureUserWordDoesNotExist(
    userId: number, 
    meaningId: number, 
  ): Promise<void> {
    const existingUserWord = await this.userWordRepository.findOne({
      where: { 
        user: { id: userId }, 
        meaning: { id: meaningId } 
      },
    });
  
    if (existingUserWord) {
      throw new ConflictException(`UserWord already exists for User ID ${userId} and Meaning ID ${meaningId}`);
    }
  }
}
