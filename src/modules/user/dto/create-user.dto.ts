import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @Length(6, 30, { message: 'Password must be between 6 and 30 characters' })
  password: string;

  @IsString({ message: "Name must be a string" })
  @IsNotEmpty({ message: "Name is required" })
  @Length(1, 60, { message: "Name must be between 1 and 60 characters" })
  name: string;

  @IsOptional()
  @Length(6, 20)
  @Matches(/^\+?\d+$/, { 
    message: 'Phone number must contain only digits and an optional leading + sign' 
  })
  number?: string;
  
  @IsOptional()
  @IsString()
  @Length(1, 100)
  countryName?: string;

  @IsOptional()
  @IsString()
  pictureUrl?: string; 
}
