import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Multer } from 'multer';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('me')
  getMe(@Req() req): User {
    return req.user; 
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User | null> {
    return this.userService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createUserDto: CreateUserDto, @UploadedFile() file?: Multer.File): Promise<User> {
    if (file) {
      createUserDto.pictureFile = file.buffer.toString('base64');
    }
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto, @UploadedFile() file?: Multer.File): Promise<User | null> {
    if (file) {
      updateUserDto.pictureFile = file.buffer.toString('base64');
    }
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.userService.delete(id);
  }
}

