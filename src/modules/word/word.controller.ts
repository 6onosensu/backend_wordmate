import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateWordDto } from 'src/modules/word/dto/create-word.dto';
import { WordService } from 'src/modules/word/word.service';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('words')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Get()
  findAll() {
    return this.wordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.wordService.findOne(id);
  }

  @Post()
  create(@Body() createWordDto: CreateWordDto) {
    return this.wordService.create(createWordDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateWordDto: CreateWordDto) {
    return this.wordService.update(id, updateWordDto);
  }
}

