import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Goal } from './entites/goal.entity';
import { GoalDto } from './dto/goal.dto';

@Injectable()
export class GoalService {
  constructor(
    @InjectRepository(Goal)
    private goalRepository: Repository<Goal>,
  ) {}

  create(goalDto: GoalDto) {
    const goal = this.goalRepository.create(goalDto);
    return this.goalRepository.save(goal);
  }

  findAll() {
    return this.goalRepository.find();
  }

  findOne(id: number) {
    return this.goalRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    await this.goalRepository.delete(id);
    return { deleted: true };
  }
}