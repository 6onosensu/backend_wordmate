import { Module } from "@nestjs/common";
import { AuthService } from "src/modules/auth/auth.service";
import { AuthController } from "src/modules/auth/auth.controller"; 
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/modules/auth/strategies/jwt.strategy';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { UserModule } from "src/modules/user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/modules/user/entities/user.entity";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserService } from "src/modules/user/user.service";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User]),
    UserModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'default_secret',
        signOptions: { expiresIn: '60d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuthGuard, UserService],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
