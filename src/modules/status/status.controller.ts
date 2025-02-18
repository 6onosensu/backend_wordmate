import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { StatusService } from './status.service';
import { Status } from './entities/status.entity';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  async findAll(): Promise<Status[]> {
    return this.statusService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Status> {
    return this.statusService.findOne(id);
  }

  @Post()
  async create(@Body('status') statusText: string): Promise<Status> {
    return this.statusService.create(statusText);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body('status') statusText: string): Promise<Status> {
    return this.statusService.update(id, statusText);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.statusService.delete(id);
  }
}
