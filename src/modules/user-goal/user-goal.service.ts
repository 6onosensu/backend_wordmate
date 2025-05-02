import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserGoal } from 'src/modules/user-goal/entites/user-goal.entity';
import { CreateUserGoalDto } from 'src/modules/user-goal/dto/user-goal.dto';

@Injectable()
export class UserGoalService {
  constructor(
    @InjectRepository(UserGoal)
    private userGoalRepository: Repository<UserGoal>,
  ) {}

  create(userId: number, userGoalDto: CreateUserGoalDto) {
    const userGoal = this.userGoalRepository.create({
      user: { id: userId } as any,  
      goal: { id: userGoalDto.goalId } as any, 
    });
    return this.userGoalRepository.save(userGoal);
  }

  findAll(userId: number) {
    return this.userGoalRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'goal'],
    });
  }

  async findOne(userId: number, id: number) {
    const goal = await this.userGoalRepository.findOne({ 
      where: { id, user: { id: userId } }, 
      relations: ['user', 'goal'],
    });

    if (!goal) {
      throw new ForbiddenException('You do not have permission to access this goal.');
    }

    return goal;
  }

  async remove(userId: number, id: number) {
    const goal = await this.findOne(userId, id);
    if (!goal) {
      throw new ForbiddenException('You do not have permission to delete this goal.');
    }

    await this.userGoalRepository.delete(id);
    return { deleted: true };
  }
}
