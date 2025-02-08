import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Meaning } from './meaning.entity';
import { CreateMeaningDto } from "./create-meaning.dto";

@Injectable()
export class MeaningService {
  constructor(
    @InjectRepository(Meaning)
    private meaningRepository: Repository<Meaning>,
  ) {}

  async create(createMeaningDto: CreateMeaningDto): Promise<Meaning> {
    const meaning = this.meaningRepository.create(createMeaningDto);
    return this.meaningRepository.save(meaning);
  }

  async findAll(): Promise<Meaning[]> {
    return this.meaningRepository.find();
  }

  async findOne(id: number): Promise<Meaning> {
    const meaning = await this.meaningRepository.findOneBy({ id });
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
