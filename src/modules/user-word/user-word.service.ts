import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserWord } from './entities/user-word.entity';
import { Repository } from 'typeorm';
import { User } from "src/modules/user/entities/user.entity";
import { CreateUserWordDto } from './dto/create-userWord.dto';
import { Meaning } from '../meaning/entities/meaning.entity';

@Injectable()
export class UserWordService {
  constructor(
    @InjectRepository(UserWord)
    private readonly userWordRepository: Repository<UserWord>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Meaning)
    private readonly meaningRepository: Repository<Meaning>
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

    const existingUserWord = await this.userWordRepository.findOne({
      where: { 
        user: { id: user.id }, 
        meaning: { id: meaning.id } 
      },
    });
    if (existingUserWord) {
      throw new Error(`UserWord already exists for User ID ${dto.userId} and Meaning ID ${dto.meaningId}`);
    }

    const userWord = this.userWordRepository.create({
      user,
      meaning,
      status: dto.status,
      repetitionDate: dto.repetitionDate || undefined,
      repetitionCount: dto.repetitionCount ?? 0,
    });

    return this.userWordRepository.save(userWord)
  }

  async update(id: number, dto: Partial<CreateUserWordDto>): Promise<UserWord> {
    const userWord = await this.findOne(id);

    if (dto.status) userWord.status = dto.status;
    if (dto.repetitionDate) userWord.repetitionDate = dto.repetitionDate;
    if (dto.repetitionCount !== undefined) userWord.repetitionCount = dto.repetitionCount;

    return this.userWordRepository.save(userWord);
  }

  async delete(id: number): Promise<void> {
    const userWord = await this.findOne(id);
    await this.userWordRepository.remove(userWord);
  }
}
