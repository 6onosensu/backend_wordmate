import { GoalModule } from './modules/goal/goal.module';
import { StatusModule } from './modules/status/status.module';
import { MeaningModule } from './modules/meaning/meaning.module';
import { WordModule } from './modules/word/word.module';
import { PartOfSpeechModule } from './modules/part-of-speech/partofspeech.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { UserWordModule } from './modules/user-word/user-word.module';
import { UserGoalModule } from './modules/user-goal/user-goal.module';

@Module({
  imports: [
    AuthModule,
    GoalModule, 
    UserGoalModule,
    StatusModule, 
    UserModule,
    PartOfSpeechModule,
    WordModule,
    MeaningModule,
    UserWordModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
  ],
})
export class AppModule {}
