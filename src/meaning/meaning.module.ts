import { Module } from '@nestjs/common';
import { MeaningService } from './meaning.service';
import { MeaningController } from './meaning.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meaning } from './meaning.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meaning])],
  providers: [MeaningService],
  controllers: [MeaningController]
})
export class MeaningModule {}
