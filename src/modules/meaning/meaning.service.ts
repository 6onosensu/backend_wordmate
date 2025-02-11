import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Meaning } from './meaning.entity';
import { CreateMeaningDto } from "./create-meaning.dto";
import { Word } from '../word/word.entity';

@Injectable()
export class MeaningService {
  constructor(
    @InjectRepository(Meaning)
    private meaningRepository: Repository<Meaning>,

    @InjectRepository(Word)
    private wordRepository: Repository<Word>,
  ) {}

  async create(wordId: number, createMeaningDto: CreateMeaningDto): Promise<Meaning> {
    const word = await this.wordRepository.findOneBy({ id: wordId });
    if (!word) throw new NotFoundException(`Word with ID ${wordId} not found`);

    const meaning = this.meaningRepository.create({ ...createMeaningDto, word });
    return this.meaningRepository.save(meaning);
  }

  async findAllGenericMeanings(): Promise<Meaning[]> {
    return this.meaningRepository.find();
  }

  async findAll(): Promise<Meaning[]> {
    return this.meaningRepository.find({ relations: ['word'] });
  }

  async findOne(id: number): Promise<Meaning> {
    const meaning = await this.meaningRepository.findOne({ where: { id }, relations: ['word'] });
    if (!meaning) throw new NotFoundException('Meaning not found');
    return meaning;
  }

  async update(id: number, updateDto: Partial<CreateMeaningDto>): Promise<Meaning> {
    const meaning = await this.findOne(id);
    Object.assign(meaning, updateDto);
    return this.meaningRepository.save(meaning);
  }

  async remove(id: number): Promise<void> {
    await this.meaningRepository.delete(id);
  }
}
