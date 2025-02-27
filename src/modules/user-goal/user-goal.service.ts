import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserGoal } from './entites/user-goal.entity';
import { CreateUserGoalDto } from './dto/user-goal.dto';

@Injectable()
export class UserGoalService {
  constructor(
    @InjectRepository(UserGoal)
    private userGoalRepository: Repository<UserGoal>,
  ) {}

  create(userGoalDto: CreateUserGoalDto) {
    const userGoal = this.userGoalRepository.create({
      user: { id: userGoalDto.userId } as any,  
      goal: { id: userGoalDto.goalId } as any, 
    });
    return this.userGoalRepository.save(userGoal);
  }

  findAll() {
    return this.userGoalRepository.find({ relations: ['user', 'goal'] });
  }

  findOne(id: number) {
    return this.userGoalRepository.findOne({ where: { id }, relations: ['user', 'goal'] });
  }

  async remove(id: number) {
    await this.userGoalRepository.delete(id);
    return { deleted: true };
  }
}
