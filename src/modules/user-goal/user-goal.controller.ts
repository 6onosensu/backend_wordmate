import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserGoalService } from './user-goal.service';
import { CreateUserGoalDto } from './dto/user-goal.dto';

@Controller('user-goals')
export class UserGoalController {
  constructor(private readonly userGoalService: UserGoalService) {}

  @Post()
  create(@Body() createUserGoalDto: CreateUserGoalDto) {
    return this.userGoalService.create(createUserGoalDto);
  }

  @Get()
  findAll() {
    return this.userGoalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userGoalService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userGoalService.remove(+id);
  }
}
