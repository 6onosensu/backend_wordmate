import { WordService } from 'src/modules/word/word.service';
import { WordController } from 'src/modules/word/word.controller';
import { Module } from '@nestjs/common';
import { Word } from 'src/modules/word/entities/word.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Word])],
  controllers: [WordController],
  providers: [WordService],
  exports: [WordService],
})
export class WordModule {}
