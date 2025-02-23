import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserWord } from './entities/user-word.entity';
import { LessThanOrEqual, Repository } from 'typeorm';
import { User } from "src/modules/user/entities/user.entity";
import { CreateUserWordDto } from './dto/create-userWord.dto';
import { Meaning } from '../meaning/entities/meaning.entity';
import { Status } from '../status/entities/status.entity';

@Injectable()
export class UserWordService {
  constructor(
    @InjectRepository(UserWord)
    private readonly userWordRepository: Repository<UserWord>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Meaning)
    private readonly meaningRepository: Repository<Meaning>,

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
    const user = await this.userRepository.findOne({ 
      where: { id: dto.userId } 
    });
    if (!user) throw new NotFoundException(`User with ID ${dto.userId} not found`);

    const meaning = await this.meaningRepository.findOne({ 
      where: { id: dto.meaningId } 
    });
    if (!meaning) throw new NotFoundException(`Meaning with ID ${dto.meaningId} not found`);

    const status = await this.statusRepository.findOne({ where: { id: dto.statusId } });
    if (!status) throw new NotFoundException(`Status with ID ${dto.statusId} not found`);

    const existingUserWord = await this.userWordRepository.findOne({
      where: { 
        user: { id: user.id }, 
        meaning: { id: meaning.id } 
      },
    });
    if (existingUserWord) {
      throw new ConflictException(`UserWord already exists for User ID ${dto.userId} and Meaning ID ${dto.meaningId}`);
    }

    const userWord = this.userWordRepository.create({
      user,
      meaning,
      status,
      repetitionDate: dto.repetitionDate || undefined,
      repetitionCount: dto.repetitionCount ?? 0,
    });

    return this.userWordRepository.save(userWord)
  }

  async update(id: number, dto: Partial<CreateUserWordDto>): Promise<UserWord> {
    const userWord = await this.findOne(id);

    const status = await this.statusRepository.findOne({ where: { id: dto.statusId } });

    if (dto.statusId) {
      const status = await this.statusRepository.findOne({ where: { id: dto.statusId } });
      if (!status) throw new NotFoundException(`Status with ID ${dto.statusId} not found`);
      userWord.status = status;
    }
    if (dto.repetitionDate) userWord.repetitionDate = dto.repetitionDate;
    if (dto.repetitionCount !== undefined) userWord.repetitionCount = dto.repetitionCount;

    return this.userWordRepository.save(userWord);
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
