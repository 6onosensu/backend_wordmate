import { UserWordService } from 'src/modules/user-word/user-word.service';
import { UserWordController } from 'src/modules/user-word/user-word.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserWord } from 'src/modules/user-word/entities/user-word.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Meaning } from 'src/modules/meaning/entities/meaning.entity';
import { Status } from 'src/modules/status/entities/status.entity';
import { StatusModule } from 'src/modules/status/status.module';
import { MeaningModule } from 'src/modules/meaning/meaning.module';
import { Word } from 'src/modules/word/entities/word.entity';
import { PartOfSpeech } from 'src/modules/part-of-speech/entities/part-of-speech.entity';
import { UserModule } from 'src/modules/user/user.module';
import { WordModule } from 'src/modules/word/word.module';
import { PartOfSpeechModule } from 'src/modules/part-of-speech/partofspeech.module';

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
