import { IsInt, IsString, IsEnum, IsOptional } from "class-validator";

export class CreateUserWordDto {
  @IsInt()
  userId: number;

  @IsInt()
  wordId: number;

  @IsString()
  @IsEnum(["to learn", "on repeat", "learned"])
  status: string;

  @IsOptional()
  repititionDate?: Date;

  @IsOptional()
  @IsInt()
  repititionCount?: number;
}