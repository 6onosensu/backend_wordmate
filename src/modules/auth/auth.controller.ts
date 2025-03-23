import { Controller, Post, Body, Delete, UseGuards, Req, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthGuard } from "../auth/guards/auth.guard";
import { UpdateUserDto } from '../user/dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: CreateUserDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('forgot-password')
  async forgotPassword(@Body("email") email: string) {
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  async resetPassword(
    @Body("token") token: string, 
    @Body("newPassword") newPassword: string
  ) {
    return this.authService.resetPassword(token, newPassword);
  }

  @UseGuards(AuthGuard)
  @Patch("update-account")
  async updateAccount(
    @Req() req,
    @Body() data: UpdateUserDto
  ) {
    return this.authService.updateAccount(req.user.id, data);
  }

  @UseGuards(AuthGuard)
  @Delete("delete-account")
  async deleteAccount(@Req() req) {
    return this.authService.deleteAccount(req.user.id);
  }
}

