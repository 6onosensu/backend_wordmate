import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Word } from './entities/word.entity';
import { Repository } from 'typeorm';
import { CreateWordDto } from './dto/create-word.dto';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>,
  ) {}

  async findAll(): Promise<Word[]> {
    return this.wordRepository.find();
  }

  async findOne(id: number): Promise<Word | null> {
    return this.wordRepository.findOne({ where: { id } });
  }

  async create(dto: CreateWordDto): Promise<Word> {
    const word = this.wordRepository.create(dto);
    return this.wordRepository.save(word);
  }

  async update(id: number, dto: CreateWordDto): Promise<Word | null> {
    const word = await this.findOne(id);
    if (!word) return null;

    word.word = dto.word;
    word.audio = dto.audio;
    return this.wordRepository.save(word);
  }

  async delete(id: number): Promise<void> {
    await this.wordRepository.delete(id);
  }
}
