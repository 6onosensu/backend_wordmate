import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MeaningService } from './meaning.service';
import { CreateMeaningDto } from './dto/create-meaning.dto';

@Controller('meanings')
export class MeaningController {
  constructor(private readonly meaningService: MeaningService) {}

  @Get()
  findAll() {
    return this.meaningService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.meaningService.findOne(id);
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
