import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PartOfSpeech } from './entities/part-of-speech.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PartOfSpeechService {
  constructor(
    @InjectRepository(PartOfSpeech)
    private readonly partOfSpeechRepository: Repository<PartOfSpeech>,
  ) {}

  async findAll(): Promise<PartOfSpeech[]> {
    return this.partOfSpeechRepository.find();
  }

  async findOne(id: number): Promise<PartOfSpeech | null> {
    return this.partOfSpeechRepository.findOne({ where: {id} });
  }

  async create(title: string): Promise<PartOfSpeech | null> {
    const partOfSpeech = this.partOfSpeechRepository.create({ title })
    return this.partOfSpeechRepository.save(partOfSpeech);
  }

  async update(id: number, title: string): Promise<PartOfSpeech | null> {
    const partOfSpeech = await this.findOne(id);
    if (!partOfSpeech) return null;

    partOfSpeech.title = title;
    return this.partOfSpeechRepository.save(partOfSpeech);
  }

  async delete(id: number): Promise<void> {
    await this.partOfSpeechRepository.delete(id);
  }
}
