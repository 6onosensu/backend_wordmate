import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meaning } from './entities/meaning.entity';
import { In, Repository } from 'typeorm';
import { CreateMeaningDto } from './dto/create-meaning.dto';
import { Word } from '../word/entities/word.entity';
import { PartOfSpeech } from '../part-of-speech/entities/part-of-speech.entity';

@Injectable()
export class MeaningService {
  constructor(
    @InjectRepository(Meaning)
    private readonly meaningRepository: Repository<Meaning>,

    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>,

    @InjectRepository(PartOfSpeech)
    private readonly partOfSpeechRepository: Repository<PartOfSpeech>,
  ) {}

  async findAll(): Promise<Meaning[]> {
    return this.meaningRepository.find({
      relations: ['partOfSpeech', 'word'],
    });
  }

  async findOne(id: number): Promise<Meaning> {
    const meaning = await this.meaningRepository.findOne({ 
      where: { id } ,
      relations: ['partOfSpeech', 'word'],
    });

    if (!meaning) {
      throw new NotFoundException(`Meaning with ID ${id} not found`);
    }

    return meaning;
  }

  async create(dto: CreateMeaningDto): Promise<Meaning> {
    const partOfSpeech = await this.findOrCreatePartOfSpeech(dto.partOfSpeech);
    const word = await this.findOrCreateWord(dto.word, dto.audio);
    const synonymMeaningIds = await this.processWords(dto.synonyms || []);
    const antonymMeaningIds = await this.processWords(dto.antonyms || []);
  
    const meaning = this.meaningRepository.create({
      partOfSpeech: { id: partOfSpeech.id },
      word: { id: word.id },
      definition: dto.definition,
      synonymMeaningIds,
      antonymMeaningIds,
    });
  
    return this.meaningRepository.save(meaning);
  }

  async update(id: number, dto: CreateMeaningDto): Promise<Meaning> {
    const meaning = await this.findOne(id);

    const partOfSpeech = await this.findOrCreatePartOfSpeech(dto.partOfSpeech);
    const word = await this.findOrCreateWord(dto.word, dto.audio);

    const synonymMeaningIds = await this.processWords(dto.synonyms || []);
    const antonymMeaningIds = await this.processWords(dto.antonyms || []);
    
    meaning.partOfSpeech = partOfSpeech;
    meaning.word = word;
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
   * Helper Function: converts ids to word names
   */
  async getWordsByIds(wordIds: number[]): Promise<string[]> {
    if (!wordIds || wordIds.length === 0) return [];

    const words = await this.wordRepository.find({
      where: { id: In(wordIds) },
    })
    return words.map((word) => word.word);
  }

  /**
   *  Helper Function: processes a list of word texts and returns their IDs
   */
  private async processWords(wordTexts: string[]): Promise<number[]> {
    return Promise.all(
      wordTexts.map(async (wordText) => {
        const word = await this.findOrCreateWord(wordText);
        return word.id;
      })
    );
  }

  /**
   * Helper Function: finds or creates a Word by its name
   */
    private async findOrCreateWord(wordText: string, audio?: string): Promise<Word> {
      let word = await this.wordRepository.findOne({ where: { word: wordText } });
  
      if (!word) {
        word = this.wordRepository.create({ word: wordText, audio });
        await this.wordRepository.save(word);
      } else if (audio && !word.audio) {
        word.audio = audio;
        await this.wordRepository.save(word);
      }
  
      return word;
    }

  /**
   * Helper Function: finds or creates a Part of Speech by its title
   */
  private async findOrCreatePartOfSpeech(title: string): Promise<PartOfSpeech> {
    let partOfSpeech = await this.partOfSpeechRepository.findOne({ where: { title } });

    if (!partOfSpeech) {
      partOfSpeech = this.partOfSpeechRepository.create({ title });
      await this.partOfSpeechRepository.save(partOfSpeech);
    }

    return partOfSpeech;
  }

}
