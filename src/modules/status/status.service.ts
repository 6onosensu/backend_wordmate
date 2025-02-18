import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './entities/status.entity';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
  ) {}

  async findAll(): Promise<Status[]> {
    return this.statusRepository.find();
  }

  async findOne(id: number): Promise<Status> {
    const status = await this.statusRepository.findOne({ where: { id } });
    if (!status) throw new NotFoundException(`Status with ID ${id} not found`);
    return status;
  }

  async create(statusText: string): Promise<Status> {
    const newStatus = this.statusRepository.create({ status: statusText });
    return this.statusRepository.save(newStatus);
  }

  async update(id: number, statusText: string): Promise<Status> {
    const status = await this.findOne(id);
    status.status = statusText;
    return this.statusRepository.save(status);
  }

  async delete(id: number): Promise<void> {
    const status = await this.findOne(id);
    await this.statusRepository.remove(status);
  }
}