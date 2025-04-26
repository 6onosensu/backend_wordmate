import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { MeaningService } from './meaning.service';
import { CreateMeaningDto } from './dto/create-meaning.dto';
import { FindOneMeaningDto } from '../../common/dto/findOne-meaning.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Meaning } from './entities/meaning.entity';
import { transformMeaningToDto } from 'src/common/transformers/meaning.transformer';

@UseGuards(AuthGuard)
@Controller('meanings')
export class MeaningController {
  constructor(private readonly meaningService: MeaningService) {}
  private async transformToDto(meaning: Meaning): Promise<FindOneMeaningDto> {
    return transformMeaningToDto(meaning, this.meaningService);
  }

  @Get()
  async findAll(): Promise<FindOneMeaningDto[]> {
    const meanings = await this.meaningService.findAll();

    return Promise.all(
      meanings.map(async (meaning) => await this.transformToDto(meaning))
    )
  }

  @Get('random')
  findRandomMeanings(
    @Query('count') count: number
  ): Promise<Meaning[]> {
    return this.meaningService.findRandomMeanings(count);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<FindOneMeaningDto> {
    const meaning = await this.meaningService.findOne(id);

    return this.transformToDto(meaning);
  }

  @Post()
  create(@Body() createMeaningDto: CreateMeaningDto) {
    return this.meaningService.create(createMeaningDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMeaningDto: CreateMeaningDto) {
    return this.meaningService.update(id, updateMeaningDto);
  }
}
