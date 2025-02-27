import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(userData: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = userData.email;
    user.password = userData.password;
    user.name = userData.name;
    user.number = userData.number ?? '';  
    user.countryName = userData.countryName ?? ''; 

    if (userData.pictureFile) {
      user.pictureFile = Buffer.from(userData.pictureFile, 'base64');
    } else if (userData.pictureUrl) {
      user.pictureUrl = userData.pictureUrl;
    }

    return this.userRepository.save(user);
  }

  async update(id: number, updateData: UpdateUserDto): Promise<User | null> {
    const user = await this.findOne(id);
    if (!user) return null;

    user.name = updateData.name ?? user.name;
    user.number = updateData.number ?? user.number;
    user.countryName = updateData.countryName ?? user.countryName;

    if (updateData.pictureFile) {
      user.pictureFile = Buffer.from(updateData.pictureFile, 'base64');
      user.pictureUrl = undefined;
    } else if (updateData.pictureUrl) {
      user.pictureUrl = updateData.pictureUrl;
      user.pictureFile = undefined;
    }

    return this.userRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
