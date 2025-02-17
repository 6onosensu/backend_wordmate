import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meaning } from './entities/meaning.entity';
import { MeaningController } from './meaning.controller';
import { MeaningService } from './meaning.service';
import { Word } from '../word/entities/word.entity';
import { PartOfSpeech } from '../part-of-speech/entities/part-of-speech.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Meaning, Word, PartOfSpeech])],
    controllers: [MeaningController],
    providers: [MeaningService],
    exports: [MeaningService],
})
export class MeaningModule {}
