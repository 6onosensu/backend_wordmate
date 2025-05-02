import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Word } from 'src/modules/word/entities/word.entity';
import { In, Repository } from 'typeorm';
import { CreateWordDto } from 'src/modules/word/dto/create-word.dto';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>,
  ) {}

  async findAll(): Promise<Word[]> {
    return this.wordRepository.find();
  }

  async findWordsByIds(wordIds: number[]): Promise<string[]> {
    if (!wordIds || wordIds.length === 0) return [];
    
      const words = await this.wordRepository.find({
        where: { id: In(wordIds) },
      })
      return words.map((word) => word.word);
  }

  async findOne(id: number): Promise<Word | null> {
    return this.wordRepository.findOne({ where: { id } });
  }

  async create(dto: CreateWordDto): Promise<Word> {
    const word = this.wordRepository.create(dto);
    return this.wordRepository.save(word);
  }

  async findOrCreateWord(dto: CreateWordDto): Promise<Word> {
    let word = await this.wordRepository.findOne({ 
      where: { word: dto.word } 
    });

    if (!word) {
      word = await this.create(dto);
    } else if (dto.audio && !word.audio) {
      word.audio = dto.audio;
      await this.wordRepository.save(word);
    }

    return word;
  }

  async update(id: number, dto: CreateWordDto): Promise<Word | null> {
    const word = await this.findOne(id);
    if (!word) return null;

    word.word = dto.word;
    word.audio = dto.audio;
    return this.wordRepository.save(word);
  }
}
