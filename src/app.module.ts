import { WordModule } from './modules/word/word.module';
import { PartOfSpeechModule } from './modules/part-of-speech/partofspeech.module';
//import { UserWordMeaningModule } from './modules/user-word-meaning/user-word-meaning.module';
//import { UserWordsModule } from './modules/user-words/user-words.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
//import { WordModule } from './modules/word/word.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

//import { BookmarkModule } from './modules/bookmark/bookmark.module';
//import { MeaningModule } from './modules/meaning/meaning.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    PartOfSpeechModule,
    WordModule,
  ],
})
export class AppModule {}
