import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MeaningService } from './meaning.service';
import { CreateMeaningDto } from './dto/create-meaning.dto';
import { FindOneMeaningDto } from './dto/findOne-meaning.dto';

@Controller('meanings')
export class MeaningController {
  constructor(private readonly meaningService: MeaningService) {}

  @Get()
  async findAll(): Promise<FindOneMeaningDto[]> {
    const meanings = await this.meaningService.findAll();

    return Promise.all(
      meanings.map(async (meaning) => ({
        id: meaning.id,
        partOfSpeech: meaning.partOfSpeech.title, 
        word: meaning.word.word, 
        audio: meaning.word.audio,
        definition: meaning.definition,
        synonyms: await this.meaningService.getWordsByIds(meaning.synonymMeaningIds ?? []),
        antonyms: await this.meaningService.getWordsByIds(meaning.antonymMeaningIds ?? []),
      }))
    )
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<FindOneMeaningDto> {
    const meaning = await this.meaningService.findOne(id);

    return {
      id: meaning.id,
      partOfSpeech: meaning.partOfSpeech.title,
      word: meaning.word.word,
      audio: meaning.word.audio,
      definition: meaning.definition,
      synonyms: await this.meaningService.getWordsByIds(meaning.synonymMeaningIds ?? []),
      antonyms: await this.meaningService.getWordsByIds(meaning.antonymMeaningIds ?? []),
    };
  }

  @Post()
  create(@Body() createMeaningDto: CreateMeaningDto) {
    return this.meaningService.create(createMeaningDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMeaningDto: CreateMeaningDto) {
    return this.meaningService.update(id, updateMeaningDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.meaningService.delete(id);
  }
}
