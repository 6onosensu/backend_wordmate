import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGoalService } from 'src/modules/user-goal/user-goal.service';
import { UserGoalController } from 'src/modules/user-goal/user-goal.controller';
import { UserGoal } from 'src/modules/user-goal/entites/user-goal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserGoal])],
  controllers: [UserGoalController],
  providers: [UserGoalService],
})
export class UserGoalModule {}
