import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PartOfSpeechService } from './partofspeech.service';
import { CreatePartOfSpeechDto } from './dto/part-of-speech.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('part-of-speech')
export class PartOfSpeechController {
  constructor(private readonly partOfSpeechService: PartOfSpeechService) {}

  @Post()
  create(@Body() createPartOfSpeechDto: CreatePartOfSpeechDto) {
    return this.partOfSpeechService.create(createPartOfSpeechDto.title);
  }
}
