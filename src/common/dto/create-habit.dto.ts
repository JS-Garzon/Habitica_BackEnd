import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateHabitDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsBoolean()
  readonly completed?: boolean;

  @IsString()
  @IsNotEmpty()
  readonly userId: string;
}
