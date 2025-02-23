import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserWordService } from './user-word.service';
import { UserWord } from './entities/user-word.entity';
import { CreateUserWordDto } from './dto/create-userWord.dto';

@Controller("userWords")
export class UserWordController {
  constructor(private readonly userWordService: UserWordService) {}

  @Get()
  findAll(): Promise<UserWord[]> {
    return this.userWordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<UserWord> {
    return this.userWordService.findOne(id);
  }

  @Get('toRepeat/:userId')
  findWordsToRepeat(@Param('userId') userId: number): Promise<UserWord[]> {
    return this.userWordService.findWordsToRepeat(userId);
  }

  @Post()
  create(@Body() dto: CreateUserWordDto): Promise<UserWord> {
    return this.userWordService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: Partial<CreateUserWordDto>): Promise<UserWord> {
    return this.userWordService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.userWordService.delete(id)
  }

  @Get('/user/:userId/status/:statusId')
  findByUserAndStatus(
    @Param('userId') userId: number,
    @Param('statusId') statusId: number,
  ): Promise<UserWord[]> {
    return this.userWordService.findByUserAndStatus(userId, statusId);
  }

}
