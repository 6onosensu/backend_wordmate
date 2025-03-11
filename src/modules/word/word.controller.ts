import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { WordService } from './word.service';
import { AuthGuard } from '../auth/guards/auth.guard';

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

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.wordService.delete(id);
  }
}

