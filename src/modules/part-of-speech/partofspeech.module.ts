import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartOfSpeech } from './entities/part-of-speech.entity';
import { PartOfSpeechService } from './partofspeech.service';
import { PartOfSpeechController } from './partofspeech.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PartOfSpeech])],
  controllers: [PartOfSpeechController],
  providers: [PartOfSpeechService],
  exports: [PartOfSpeechService],
})
export class PartOfSpeechModule {}
