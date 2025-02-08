import { Controller, Post, Get, Patch, Delete, Body, Param } from "@nestjs/common";
import { MeaningService } from "./meaning.service";
import { CreateMeaningDto } from "./create-meaning.dto";

@Controller('meaning')
export class MeaningController {
  constructor(private meaningService: MeaningService) {}

  @Post()
  create(@Body() createMeaningDto: CreateMeaningDto) {
    return this.meaningService.create(createMeaningDto);
  }

  @Get()
  findAll() {
    return this.meaningService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.meaningService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDto: Partial<CreateMeaningDto>) {
    return this.meaningService.update(+id, updateDto);
  } 

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.meaningService.remove(+id);
  }
}
