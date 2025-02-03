import { Controller, Post, Get, Delete, Body, } from "@nestjs/common";
import { WordService } from "./word.service";
import { CreateWordDto } from './dto/create-word.dto';

@Controller('words')
export class WordController {
  constructor(private wordService: WordService) {}

  @Post()
  create(@Body() createWordDto: CreateWordDto) {
    return this.wordService.create(createWordDto);
  }
  
}