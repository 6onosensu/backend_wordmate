import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Goal } from 'src/modules/goal/entites/goal.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { BaseEntityWithTimestamps } from 'src/common/base.entity';

@Entity('userGoal')
export class UserGoal extends BaseEntityWithTimestamps {
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Goal, (goal) => goal.id)
  @JoinColumn({ name: 'goalId' })
  goal: Goal;
}