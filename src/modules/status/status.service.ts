import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './entities/status.entity';

@Injectable()
export class StatusService implements OnModuleInit {
  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
  ) {}

  async onModuleInit() {
    await this.initializeStatuses();
  }

  async initializeStatuses(): Promise<void> {
    const requiredStatuses = ["To Explore", "To Refresh", "Retained"];

    for (const statusText of requiredStatuses) {
      const existingStatus = await this.statusRepository.findOne({ 
        where: { status: statusText } 
      });

      if (!existingStatus) {
        await this.create(statusText);
      }
    }
  }

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