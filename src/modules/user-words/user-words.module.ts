import { UserWordsService } from './user-words.service';
import { UserWordsController } from './user-words.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [UserWordsController],
  providers: [
        UserWordsService, ],
})
export class UserWordsModule {}
