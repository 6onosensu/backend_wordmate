import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meaning } from 'src/modules/meaning/entities/meaning.entity';
import { MeaningController } from 'src/modules/meaning/meaning.controller';
import { MeaningService } from 'src/modules/meaning/meaning.service';
import { WordModule } from 'src/modules/word/word.module';
import { PartOfSpeechModule } from 'src/modules/part-of-speech/partofspeech.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meaning]),
    WordModule,
    PartOfSpeechModule,
  ],
  controllers: [MeaningController],
  providers: [MeaningService],
  exports: [MeaningService],
})
export class MeaningModule {}
