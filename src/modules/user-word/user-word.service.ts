import { 
  ConflictException, Injectable, NotFoundException, OnModuleInit 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { calculateNextRepetitionDate, updateDueStatus } from 'src/modules/user-word/user-word.helpers';
import { UserWord } from 'src/modules/user-word/entities/user-word.entity';
import { CreateUserWordDto } from 'src/modules/user-word/dto/create-userWord.dto';
import { Status } from 'src/modules/status/entities/status.entity';
import { MeaningService } from 'src/modules/meaning/meaning.service';
import { UserService } from 'src/modules/user/user.service';
import { WordService } from 'src/modules/word/word.service';
import { PartOfSpeechService } from 'src/modules/part-of-speech/partofspeech.service';
import { StatusService } from 'src/modules/status/status.service';
import { CreateMeaningDto } from 'src/modules/meaning/dto/create-meaning.dto';
import { UserWordWithMeaningDto } from 'src/modules/user-word/dto/user-word-with-meaning.dto';
import { mapUserWordToDto } from 'src/utils/user-word-mapping';

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
      updateDueStatus(this.userWordRepository).catch((err) => {
        console.error('Unhandled error in updateDueWords:', err);
      });
    }, 60 * 60 * 1000 );
  }
  
  async findByUserAndStatus( 
    userId: number, status: string, isDue: boolean
  ): Promise<UserWordWithMeaningDto[]> {
    const decodedStatus = decodeURIComponent(status);
    const statusEntity = await this.statusRepository.findOne({ 
      where: { status: decodedStatus } 
    });

    if (!statusEntity) throw new NotFoundException();

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
      throw new NotFoundException();
    }
  
    return Promise.all(
      userWordList.map(userWord => mapUserWordToDto(userWord, this.meaningService))
    );
  }

  async findOne(id: number, userId: number): Promise<UserWord> {
    const userWord = await this.userWordRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!userWord) throw new NotFoundException();
    return userWord;
  }

  async create(dto: CreateUserWordDto): Promise<UserWord> {
    const user = await this.userService.findOne(dto.userId);
    if (!user) throw new NotFoundException();

    const createWordDto = { word: dto.word, audio: dto.audio, };
    const word = await this.wordService.findOrCreateWord(createWordDto);
    const partOfSpeech = await this.partOfSpeechService
      .findOrCreatePartOfSpeech(dto.partOfSpeech);
    
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

  async update(
    id: number, repetitionCount: number,  userId: number
  ): Promise<UserWord> {
    const userWord = await this.findOne(id, userId);
    userWord.repetitionCount = Math.min(repetitionCount, 7);
  
    const isCompleteCycle = userWord.repetitionCount === 6;

    if (isCompleteCycle) {
      const intervals = userWord.intervalRepetitions;
      userWord.repetitionDate = calculateNextRepetitionDate(intervals);
      userWord.repetitionCount = 0;
      userWord.intervalRepetitions++;
      userWord.due = false;
      
      userWord.status.id =
        intervals >= 4 ? 3 :
        intervals >= 2 ? 2 :
        userWord.status.id; 
    }
    return this.userWordRepository.save(userWord);
  }

  async delete(id: number, userId: number): Promise<void> {
    const userWord = await this.findOne(id, userId);
    await this.userWordRepository.remove(userWord);
  }

  async ensureUserWordDoesNotExist(
    userId: number, meaningId: number, 
  ): Promise<void> {
    const existing = await this.userWordRepository.findOne({
      where: { 
        user: { id: userId }, 
        meaning: { id: meaningId } 
      },
    });
  
    if (existing) throw new ConflictException(`Already exists!`);
  }
}
