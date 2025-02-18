import { IsInt, IsString, IsEnum, IsOptional } from "class-validator";

export class CreateUserWordDto {
  @IsInt()
  userId: number;

  @IsInt()
  meaningId: number;

  @IsInt()
  statusId: number;

  @IsOptional()
  repetitionDate?: Date;

  @IsOptional()
  @IsInt()
  repetitionCount?: number;
}