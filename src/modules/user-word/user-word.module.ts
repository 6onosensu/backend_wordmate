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
import { Word } from '../word/entities/word.entity';
import { PartOfSpeech } from '../part-of-speech/entities/part-of-speech.entity';
import { UserModule } from '../user/user.module';
import { WordModule } from '../word/word.module';
import { PartOfSpeechModule } from '../part-of-speech/partofspeech.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserWord, 
      User, 
      Meaning, 
      Word,
      PartOfSpeech, 
      Status
    ]),
    UserModule,
    WordModule, 
    MeaningModule, 
    PartOfSpeechModule, 
    StatusModule,
  ],
  controllers: [UserWordController],
  providers: [UserWordService],
  exports: [UserWordService],
})
export class UserWordModule {}
