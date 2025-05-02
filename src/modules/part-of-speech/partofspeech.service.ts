import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PartOfSpeech } from 'src/modules/part-of-speech/entities/part-of-speech.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PartOfSpeechService {
  constructor(
    @InjectRepository(PartOfSpeech)
    private readonly partOfSpeechRepository: Repository<PartOfSpeech>,
  ) {}

  async create(title: string): Promise<PartOfSpeech> {
    const partOfSpeech = this.partOfSpeechRepository.create({ title })
    return this.partOfSpeechRepository.save(partOfSpeech);
  }

  async findOrCreatePartOfSpeech(title: string): Promise<PartOfSpeech> {
    let partOfSpeech = await this.partOfSpeechRepository.findOne({ 
      where: { title: title } 
    });
  
    if (!partOfSpeech) {
      partOfSpeech = await this.create(title);
    }
  
    return partOfSpeech;
  }
}
