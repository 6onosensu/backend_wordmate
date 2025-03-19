import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailerService: MailerService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async register(registerDto: CreateUserDto): Promise<User> {
    console.log("AuthService: registerDto:", registerDto);

    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email } 
    });
    if (existingUser) {
      throw new UnauthorizedException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    return this.userService.create({
      ...registerDto,
      password: hashedPassword, 
    });
  }

  async login(email: string, password: string): Promise<{ 
    access_token: string 
  }> {
    const user = await this.userRepository.findOne({
      where: { email: email } 
    });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { id: user.id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }

  async forgotPassword(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException("User with this email does not exist.");
    }

    const token = this.jwtService.sign({ email }, { expiresIn: "1h" });

    const resetLink = `http://localhost:5173/reset-password?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: "Password Reset Request",
      html: `
        <h2>Password Reset Request</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>If you didn't request this, ignore this email.</p>
      `,
    });

    return { message: "Password reset link has been sent to your email." };
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.userService.findByEmail(payload.email);
  
      if (!user) {
        throw new NotFoundException("User not found.");
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
  
      await this.userRepository.save(user);
  
      return { message: "Password has been successfully reset!" };
    } catch (error) {
      throw new UnauthorizedException("Invalid or expired token.");
    }
  }

  async deleteAccount(userId: number) {
    const user = await this.userRepository.findOne({ 
      where: { id: userId } 
    });

    if (!user) {
      throw new NotFoundException("User not found.");
    }

    await this.userRepository.remove(user);

    return { message: "Account deleted successfully." };
  }
}
