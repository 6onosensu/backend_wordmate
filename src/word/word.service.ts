import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Word } from './word.entity';
import { CreateWordDto } from './dto/create-word.dto';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(Word)
    private wordRepository: Repository<Word>,
  ) {}

  async create(createWordDto: CreateWordDto): Promise<Word> {
    const word = this.wordRepository.create({
      word: createWordDto.word,
      audio: createWordDto.audio,
      partOfSpeech: createWordDto.partOfSpeech,
    });

    //const meanings = createWordDto ??

    return this.wordRepository.save(word);
  }
}