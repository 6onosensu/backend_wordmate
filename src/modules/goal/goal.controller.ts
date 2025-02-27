import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { GoalService } from './goal.service';
import { GoalDto } from './dto/goal.dto';

@Controller('goals')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Post()
  create(@Body() createGoalDto: GoalDto) {
    return this.goalService.create(createGoalDto);
  }

  @Get()
  findAll() {
    return this.goalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.goalService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goalService.remove(+id);
  }
}