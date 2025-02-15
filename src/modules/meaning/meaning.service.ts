import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meaning } from './entities/meaning.entity';
import { Repository } from 'typeorm';
import { CreateMeaningDto } from './dto/create-meaning.dto';

@Injectable()
export class MeaningService {
  constructor(
    @InjectRepository(Meaning)
    private readonly meaningRepository: Repository<Meaning>,
  ) {}

  async findAll(): Promise<Meaning[]> {
    return this.meaningRepository.find();
  }

  async findOne(id: number): Promise<Meaning> {
    const meaning = await this.meaningRepository.findOne({ where: { id } });
    if (!meaning) {
      throw new NotFoundException(`Meaning with ID ${id} not found`);
    }
    return meaning;
  }

  async create(dto: CreateMeaningDto): Promise<Meaning> {
    const meaning = this.meaningRepository.create({

    })
    return this.meaningRepository.save(meaning);
  }

  async update(id: number, dto: CreateMeaningDto): Promise<Meaning> {
    const meaning = await this.findOne(id);

    meaning.definition = dto.definition;

    return this.meaningRepository.save(meaning);
  }

  async delete(id: number): Promise<void> {
    const meaning = await this.findOne(id);
    await this.meaningRepository.remove(meaning);
  }
}
