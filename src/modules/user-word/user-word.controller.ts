import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
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
  findOne(
    @Param('id') id: number,
    @Req() req
  ): Promise<UserWord> {
    return this.userWordService.findOne(id, req.user.id);
  }

  @Post()
  create(@Body() dto: CreateUserWordDto, @Req() req): Promise<UserWord> {
    return this.userWordService.create({ ...dto, userId: req.user.id });
  }

  @Patch(':id')
  update(
    @Param('id') id: number, 
    @Body() dto: { 
      repetitionCount: number, 
      intervalRepetitions: number 
    },
    @Req() req
  ) {
    return this.userWordService.update(
      id, 
      dto.repetitionCount, 
      dto.intervalRepetitions,
      req.user.id
    );
  }

  @Delete(':id')
  delete(
    @Param('id') id: number,
    @Req() req
  ): Promise<void> {
    return this.userWordService.delete(id, req.user.id)
  }

  @Get('/user/:userId/status/:statusId')
  findByUserAndStatus(
    @Param('userId') userId: number,
    @Param('statusId') statusId: number,
  ): Promise<UserWord[]> {
    return this.userWordService.findByUserAndStatus(userId, statusId);
  }

}
