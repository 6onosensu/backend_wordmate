import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordModule } from './word/word.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { MeaningModule } from './meaning/meaning.module';

@Module({
  imports: [
    AuthModule, 
    UserModule, 
    BookmarkModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: '',
      password: '',
      database: 'wordmate',
      autoLoadEntities: true,
      synchronize: true,
    }),
    WordModule,
    MeaningModule,
  ],
})
export class AppModule {}
