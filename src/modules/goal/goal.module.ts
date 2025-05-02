import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalService } from 'src/modules/goal/goal.service';
import { GoalController } from 'src/modules/goal/goal.controller';
import { Goal } from 'src/modules/goal/entites/goal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Goal])],
  controllers: [GoalController],
  providers: [GoalService],
})
export class GoalModule {}
