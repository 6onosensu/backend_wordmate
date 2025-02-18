import { UserWordService } from './user-word.service';
import { UserWordController } from './user-word.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserWord } from './entities/user-word.entity';
import { User } from '../user/entities/user.entity';
import { Word } from '../word/entities/word.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserWord, User, Word])],
  controllers: [UserWordController],
  providers: [ UserWordService],
})
export class UserWordModule {}
