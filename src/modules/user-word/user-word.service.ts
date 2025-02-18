import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserWord } from './entities/user-word.entity';
import { Repository } from 'typeorm';
import { User } from "src/modules/user/entities/user.entity";
import { Word } from "src/modules/word/entities/word.entity"
import { CreateUserWordDto } from './dto/create-userWord.dto';

@Injectable()
export class UserWordService {
  constructor(
    @InjectRepository(UserWord)
    private readonly userWordRepository: Repository<UserWord>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>
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
    const user = await this.userRepository.findOne({ where: {id: dto.userId} });
    if (!user) throw new NotFoundException(`User with ID ${dto.userId} not found`);

    const word = await this.wordRepository.findOne({ where: { id: dto.wordId } });
    if (!word) throw new NotFoundException(`Word with ID ${dto.wordId} not found`);

    const userWord = this.userWordRepository.create({
      user,
      word,
      status: dto.status,
      repetitionDate: dto.repititionDate,
      repititionCount: dto.repititionCount ?? 0,
    });

    return this.userWordRepository.save(userWord)
  }

  async update(id: number, dto: Partial<CreateUserWordDto>): Promise<UserWord> {
    const userWord = await this.findOne(id);

    if (dto.status) userWord.status = dto.status;
    if (dto.repititionDate) userWord.repetitionDate = dto.repititionDate;
    if (dto.repititionCount !== undefined) userWord.repititionCount = dto.repititionCount;

    return this.userWordRepository.save(userWord);
  }

  async delete(id: number): Promise<void> {
    const userWord = await this.findOne(id);
    await this.userWordRepository.remove(userWord);
  }
}
