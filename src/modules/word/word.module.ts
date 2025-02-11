import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from './word.entity';
import { WordService } from './word.service';
import { WordController } from './word.controller';
import { Meaning } from "../meaning/entities/meaning.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Word, Meaning])],
  providers: [WordService],
  controllers: [WordController],
})
export class WordModule {}