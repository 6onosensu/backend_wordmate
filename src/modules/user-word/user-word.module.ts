import { UserWordService } from './user-word.service';
import { UserWordController } from './user-word.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserWord } from './entities/user-word.entity';
import { User } from '../user/entities/user.entity';
import { Meaning } from '../meaning/entities/meaning.entity';
import { MeaningModule } from '../meaning/meaning.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserWord, User, Meaning]),
    MeaningModule,
  ],
  controllers: [UserWordController],
  providers: [ UserWordService],
})
export class UserWordModule {}
