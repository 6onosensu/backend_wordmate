import { Controller, Post, Get, Delete, Body, Patch, Param} from "@nestjs/common";
import { WordService } from "./word.service";
import { CreateWordDto } from './create-word.dto';

@Controller('words')
export class WordController {
  constructor(private wordService: WordService) {}

  @Post()
  create(@Body() createWordDto: CreateWordDto) {
    return this.wordService.create(createWordDto);
  }

  @Get()
  findAll() {
    return this.wordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.wordService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDto: Partial<CreateWordDto>) {
    return this.wordService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.wordService.remove(+id);
  }
}