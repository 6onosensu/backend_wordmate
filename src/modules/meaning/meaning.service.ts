import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meaning } from './entities/meaning.entity';
import { Repository } from 'typeorm';
import { CreateMeaningDto } from './dto/create-meaning.dto';
import { Word } from '../word/entities/word.entity';

@Injectable()
export class MeaningService {
  constructor(
    @InjectRepository(Meaning)
    private readonly meaningRepository: Repository<Meaning>,

    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>,
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
    const word = await this.findWordById(dto.wordId);
  
    const synonymMeaningIds = await this.processWords(dto.synonymMeaningIds || []);
    const antonymMeaningIds = await this.processWords(dto.antonymMeaningIds || []);
  
    const meaning = this.meaningRepository.create({
      partOfSpeech: { id: dto.partOfSpeechId },
      word: { id: dto.wordId },
      definition: dto.definition,
      synonymMeaningIds,
      antonymMeaningIds,
    });
  
    return this.meaningRepository.save(meaning);
  }

  async update(id: number, dto: CreateMeaningDto): Promise<Meaning> {
    const meaning = await this.findOne(id);

    const synonymMeaningIds = await this.processWords(dto.synonymMeaningIds || []);
    const antonymMeaningIds = await this.processWords(dto.antonymMeaningIds || []);
    meaning.definition = dto.definition;
    meaning.synonymMeaningIds = synonymMeaningIds;
    meaning.antonymMeaningIds = antonymMeaningIds;

    return this.meaningRepository.save(meaning);
  }

  async delete(id: number): Promise<void> {
    const meaning = await this.findOne(id);
    await this.meaningRepository.remove(meaning);
  }

  /**
   * Helper Function: Finds an existing word by ID or throws an error
   */
  private async findWordById(wordId: number): Promise<Word> {
    const word = await this.wordRepository.findOne({ where: { id: wordId } });
    if (!word) {
      throw new NotFoundException(`Word with ID ${wordId} not found`);
    }
    return word;
  }

  /**
   *  Helper Function: Processes a list of word texts and returns their IDs
   */
  private async processWords(wordTexts: string[]): Promise<number[]> {
    return Promise.all(
      wordTexts.map(async (wordText) => {
        let existingWord = await this.wordRepository.findOne({ where: { word: wordText } });

        if (!existingWord) {
          existingWord = this.wordRepository.create({ word: wordText });
          await this.wordRepository.save(existingWord);
        }

        return existingWord.id;
      })
    );
  }
}
