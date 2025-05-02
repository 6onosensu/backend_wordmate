import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meaning } from 'src/modules/meaning/entities/meaning.entity';
import { Repository } from 'typeorm';
import { CreateMeaningDto } from 'src/modules/meaning/dto/create-meaning.dto';
import { WordService } from 'src/modules/word/word.service';
import { PartOfSpeechService } from 'src/modules/part-of-speech/partofspeech.service';

@Injectable()
export class MeaningService {
  constructor(
    @InjectRepository(Meaning)
    private readonly meaningRepository: Repository<Meaning>,

    private readonly wordService: WordService,
    private readonly partOfSpeechService: PartOfSpeechService,
  ) {}

  async findAll(): Promise<Meaning[]> {
    return this.meaningRepository.find({
      relations: ['partOfSpeech', 'word'],
    });
  }

  async findRandomMeanings(count: number): Promise<Meaning[]> {
    const allMeanings = await this.findAll();

    const shuffled = allMeanings.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
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
    const partOfSpeech = await this.partOfSpeechService.findOrCreatePartOfSpeech(dto.partOfSpeech);
    const createWordDto = { word: dto.word, audio: dto.audio };
    const word = await this.wordService.findOrCreateWord(createWordDto);

    const existingMeaning = await this.findExistingMeaning(word.id, partOfSpeech.id, dto.definition);
    if (existingMeaning) {
      if (!existingMeaning.example && dto.example) {
        existingMeaning.example = dto.example;
        return this.meaningRepository.save(existingMeaning);
      }
      return existingMeaning;
    }

    const synonymMeaningIds = await this.processWords(dto.synonyms || []);
    const antonymMeaningIds = await this.processWords(dto.antonyms || []);
  
    const meaning = this.meaningRepository.create({
      partOfSpeech: { id: partOfSpeech.id },
      word: { id: word.id },
      definition: dto.definition,
      synonymMeaningIds,
      antonymMeaningIds,
      example: dto.example,
    });
  
    return this.meaningRepository.save(meaning);
  }

  async update(id: number, dto: CreateMeaningDto): Promise<Meaning> {
    const meaning = await this.findOne(id);

    const partOfSpeech = await this.partOfSpeechService.findOrCreatePartOfSpeech(dto.partOfSpeech);
    const createWordDto = { word: dto.word, audio: dto.audio, };
    const word = await this.wordService.findOrCreateWord(createWordDto);

    const synonymMeaningIds = await this.processWords(dto.synonyms || []);
    const antonymMeaningIds = await this.processWords(dto.antonyms || []);
    
    meaning.partOfSpeech = partOfSpeech;
    meaning.word = word;
    meaning.definition = dto.definition;
    meaning.synonymMeaningIds = synonymMeaningIds;
    meaning.antonymMeaningIds = antonymMeaningIds;
    if (dto.example !== undefined) {
      meaning.example = dto.example;
    }

    return this.meaningRepository.save(meaning);
  }

  /**
   * Helper Function: searches for an existing meaning before creating a new one
   */
  private async findExistingMeaning(
    wordId: number, 
    partOfSpeechId: number, 
    definition: string
  ): Promise<Meaning | null> {
    return this.meaningRepository.findOne({
      where: { 
        word: { id: wordId },
        partOfSpeech: { id: partOfSpeechId },
        definition: definition,
      }
    });
  }

  /**
   * Helper Function: converts ids to word names
   */
  async getWordsByIds(wordIds: number[]): Promise<string[]> {
    return await this.wordService.findWordsByIds(wordIds);
  }

  /**
   *  Helper Function: processes a list of word texts and returns their IDs
   */
  private async processWords(wordTexts: string[]): Promise<number[]> {
    return Promise.all(
      wordTexts.map(async (wordText) => {
        const createWordDto = { 
          word: wordText, 
          audio: undefined 
        };
        const word = await this.wordService.findOrCreateWord(createWordDto);
        return word.id;
      })
    );
  }
}
