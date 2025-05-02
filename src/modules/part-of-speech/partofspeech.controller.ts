import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PartOfSpeechService } from 'src/modules/part-of-speech/partofspeech.service';
import { CreatePartOfSpeechDto } from 'src/modules/part-of-speech/dto/part-of-speech.dto';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('part-of-speech')
export class PartOfSpeechController {
  constructor(private readonly partOfSpeechService: PartOfSpeechService) {}

  @Post()
  create(@Body() createPartOfSpeechDto: CreatePartOfSpeechDto) {
    return this.partOfSpeechService.create(createPartOfSpeechDto.title);
  }
}
