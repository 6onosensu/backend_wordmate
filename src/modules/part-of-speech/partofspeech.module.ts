import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartOfSpeech } from 'src/modules/part-of-speech/entities/part-of-speech.entity';
import { PartOfSpeechService } from 'src/modules/part-of-speech/partofspeech.service';
import { PartOfSpeechController } from 'src/modules/part-of-speech/partofspeech.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PartOfSpeech])],
  controllers: [PartOfSpeechController],
  providers: [PartOfSpeechService],
  exports: [PartOfSpeechService],
})
export class PartOfSpeechModule {}
