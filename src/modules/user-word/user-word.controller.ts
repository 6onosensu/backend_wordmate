import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards, } from '@nestjs/common';
import { UserWordService } from 'src/modules/user-word/user-word.service';
import { UserWord } from 'src/modules/user-word/entities/user-word.entity';
import { CreateUserWordDto } from 'src/modules/user-word/dto/create-userWord.dto';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { UserWordWithMeaningDto } from 'src/modules/user-word/dto/user-word-with-meaning.dto';

@UseGuards(AuthGuard)
@Controller("userWords")
export class UserWordController {
  constructor(private readonly userWordService: UserWordService) {}
  
  @Get('status/filter')
  findByUserAndStatus(
    @Req() req,
    @Query('status') status: string,
    @Query('due') due: string, 
  ): Promise<UserWordWithMeaningDto[]> {
    return this.userWordService.findByUserAndStatus(
      req.user.id, 
      status,
      due === 'true'
    );
  }
  
  @Get(':id')
  findOne(
    @Param('id') id: number,
    @Req() req
  ): Promise<UserWord> {
    return this.userWordService.findOne(id, req.user.id);
  }

  @Post()
  create(
    @Body() dto: CreateUserWordDto, 
    @Req() req
  ): Promise<UserWord> {
    const requestData = { ...dto, userId: req.user.id };
    return this.userWordService.create(requestData);
  }

  @Patch(':id')
  update(
    @Param('id') id: number, 
    @Body() dto: { 
      repetitionCount: number, 
    },
    @Req() req
  ) {
    return this.userWordService.update(
      id, 
      dto.repetitionCount, 
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
}
