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
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { MailerModule } from "@nestjs-modules/mailer";
import { join } from "path";

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
    MailerModule.forRoot({
      transport: {
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER, 
          pass: process.env.EMAIL_PASS,
        },
      },
      defaults: {
        from: '"WordMate Support" <wordmate.team@gmail.com>',
      },
      template: {
        dir: join(__dirname, "templates"),
        adapter: new HandlebarsAdapter(), 
        options: { strict: true },
      },
    })
  ],
})
export class AppModule {}
