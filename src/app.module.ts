import { UserWordMeaningModule } from './modules/user-word-meaning/user-word-meaning.module';
import { UserProfileModule } from './modules/user-profile/user-profile.module';
import { UserWordsModule } from './modules/user-words/user-words.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordModule } from './modules/word/word.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { BookmarkModule } from './modules/bookmark/bookmark.module';
import { MeaningModule } from './modules/meaning/meaning.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule, 
    UserModule,
    UserWordMeaningModule, 
    UserProfileModule, 
    UserWordsModule, 
    WordModule,
    MeaningModule,
    BookmarkModule,
  ],
})
export class AppModule {}
