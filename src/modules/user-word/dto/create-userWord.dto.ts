import { IsInt, IsOptional, IsBoolean } from "class-validator";

export class CreateUserWordDto {
  @IsInt()
  userId: number;

  @IsInt()
  meaningId: number;

  @IsInt()
  statusId: number;

  @IsOptional()
  repetitionDate?: Date;

  @IsBoolean()
  due: boolean;

  @IsOptional()
  @IsInt()
  repetitionCount?: number;
}