import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Word } from './word.entity';
import { CreateWordDto } from './dto/create-word.dto';
import { Meaning } from "./meaning.entity";

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(Word)
    private wordRepository: Repository<Word>,

    @InjectRepository(Meaning)
    private meaningRepository: Repository<Meaning>,
  ) {}

  async create(createWordDto: CreateWordDto): Promise<Word> {
    const word = this.wordRepository.create({
      word: createWordDto.word,
      audio: createWordDto.audio,
      partOfSpeech: createWordDto.partOfSpeech,
    });

    if (createWordDto.meanings) {
      const meanings = createWordDto.meanings.map((meaningdDto) =>
        this.meaningRepository.create(meaningdDto),
      );
      word.meanings = await this.meaningRepository.save(meanings);
    }

    return this.wordRepository.save(word);
  }

  async findAll(): Promise<Word[]> {
    return this.wordRepository.find({ relations: ['meanings'] });
  }

  async findOne(id: number): Promise<Word> {
    const word = await this.wordRepository.findOne({where: { id }, relations: ['meanings']});
    if (!word) {
      throw new NotFoundException(`Word with ID ${id} not found`);
    }
    return word;
  }

  async update(id: number, updateDto: Partial<CreateWordDto>): Promise<Word> {
    const word = await this.findOne(id);
    Object.assign(word, updateDto);
    return this.wordRepository.save(word);
  }

  async remove(id: number): Promise<void> {
    const word = await this.findOne(id);
    await this.wordRepository.remove(word);
  }
}