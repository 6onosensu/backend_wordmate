import { UserWordService } from './user-word.service';
import { UserWordController } from './user-word.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserWord } from './entities/user-word.entity';
import { User } from '../user/entities/user.entity';
import { Meaning } from '../meaning/entities/meaning.entity';
import { Status } from '../status/entities/status.entity';
import { StatusModule } from '../status/status.module';
import { MeaningModule } from '../meaning/meaning.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserWord, User, Meaning, Status]),
    StatusModule,
    MeaningModule,
  ],
  controllers: [UserWordController],
  providers: [UserWordService],
})
export class UserWordModule {}
