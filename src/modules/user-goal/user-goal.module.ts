import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGoalService } from './user-goal.service';
import { UserGoalController } from './user-goal.controller';
import { UserGoal } from './entites/user-goal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserGoal])],
  controllers: [UserGoalController],
  providers: [UserGoalService],
})
export class UserGoalModule {}
