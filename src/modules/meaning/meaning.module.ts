import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meaning } from './entities/meaning.entity';
import { MeaningController } from './meaning.controller';
import { MeaningService } from './meaning.service';

@Module({
    imports: [TypeOrmModule.forFeature([Meaning])],
    controllers: [MeaningController],
    providers: [MeaningService],
    exports: [MeaningService],
})
export class MeaningModule {}
