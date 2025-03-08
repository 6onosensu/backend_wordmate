import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { UserWordService } from './user-word.service';
import { UserWord } from './entities/user-word.entity';
import { CreateUserWordDto } from './dto/create-userWord.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@UseGuards(AuthGuard)
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

  @Get('/status')
  findByUserAndStatus(
    @Req() req,
    @Query('status') status: string,
    @Query('due') due: string, 
  ): Promise<UserWord[]> {
    console.log(": ", req.user.id, status, due === 'true' );
    return this.userWordService.findByUserAndStatus(
      req.user.id, 
      status,
      due === 'true'
    );
  }

}
