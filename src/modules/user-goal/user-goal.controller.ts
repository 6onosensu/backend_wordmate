import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserGoalService } from 'src/modules/user-goal/user-goal.service';
import { CreateUserGoalDto } from 'src/modules/user-goal/dto/user-goal.dto';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('user-goals')
export class UserGoalController {
  constructor(private readonly userGoalService: UserGoalService) {}

  @Post()
  create(@Body() createUserGoalDto: CreateUserGoalDto, @Req() req) {
    return this.userGoalService.create(req.user.id, createUserGoalDto);
  }

  @Get()
  findAll(@Req() req) {
    return this.userGoalService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.userGoalService.findOne(req.user.id, +id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.userGoalService.remove(req.user.id, +id);
  }
}
