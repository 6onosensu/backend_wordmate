import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { StatusService } from './status.service';
import { Status } from './entities/status.entity';
import { AuthGuard } from '../auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  async findAll(): Promise<Status[]> {
    return this.statusService.findAll();
  }

  @Post()
  async create(@Body('status') statusText: string): Promise<Status> {
    return this.statusService.create(statusText);
  }

}
