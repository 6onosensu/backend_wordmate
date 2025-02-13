import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PartOfSpeechService } from './partofspeech.service';
import { CreatePartOfSpeechDto } from './dto/part-of-speech.dto';

@Controller('part-of-speech')
export class PartOfSpeechController {
  constructor(private readonly partOfSpeechService: PartOfSpeechService) {}

  @Get()
  findAll() {
    return this.partOfSpeechService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.partOfSpeechService.findOne(id);
  }

  @Post()
  create(@Body() createPartOfSpeechDto: CreatePartOfSpeechDto) {
    return this.partOfSpeechService.create(createPartOfSpeechDto.title);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePartOfSpeechDto: CreatePartOfSpeechDto) {
    return this.partOfSpeechService.update(id, updatePartOfSpeechDto.title);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.partOfSpeechService.delete(id);
  }
}
