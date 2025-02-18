import { IsInt, IsString, IsEnum, IsOptional } from "class-validator";

export class CreateUserWordDto {
  @IsInt()
  userId: number;

  @IsInt()
  meaningId: number;

  @IsString()
  @IsEnum(["to learn", "on repeat", "learned"])
  status: string;

  @IsOptional()
  repetitionDate?: Date;

  @IsOptional()
  @IsInt()
  repetitionCount?: number;
}