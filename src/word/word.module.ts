import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from './word.entity';
import { WordService } from './word.service';
import { WordController } from './word.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Word, ])],
  providers: [WordService],
  controllers: [WordController],
})
export class WordModule {}