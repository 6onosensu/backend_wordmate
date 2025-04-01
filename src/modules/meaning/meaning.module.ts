import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meaning } from './entities/meaning.entity';
import { MeaningController } from './meaning.controller';
import { MeaningService } from './meaning.service';
import { WordModule } from '../word/word.module';
import { PartOfSpeechModule } from '../part-of-speech/partofspeech.module';

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
