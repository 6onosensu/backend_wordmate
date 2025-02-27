import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 20)
  password: string;

  @IsString({ message: "Name must be a string" })
  @IsNotEmpty({ message: "Name is required" })
  @Length(1, 60, { message: "Name must be between 1 and 60 characters" })
  name: string;

  @IsOptional()
  @IsString()
  @Length(6, 20)
  @Matches(/^\+?\d+$/, { 
    message: 'Phone number must contain only digits and an optional leading + sign' 
  })
  number?: string;

  @IsOptional()
  @IsString()
  picture?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  countryName?: string;
}
