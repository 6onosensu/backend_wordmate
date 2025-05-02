import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { StatusService } from 'src/modules/status/status.service';
import { Status } from 'src/modules/status/entities/status.entity';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

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
