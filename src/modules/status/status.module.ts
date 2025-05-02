import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from 'src/modules/status/entities/status.entity';
import { StatusController } from 'src/modules/status/status.controller';
import { StatusService } from 'src/modules/status/status.service';

@Module({
  imports: [TypeOrmModule.forFeature([Status])], 
  controllers: [StatusController],
  providers: [StatusService],
  exports: [StatusService],
})
export class StatusModule {}