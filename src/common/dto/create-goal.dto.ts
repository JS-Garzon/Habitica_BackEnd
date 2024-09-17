import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { IsAfterDate } from '../validators/is-after-date.validator';

export class CreateGoalDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  readonly startDate: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @IsAfterDate('startDate', {
    message:
      'La fecha de finalización debe ser posterior a la fecha de inicio.',
  })
  readonly finishDate: Date;

  @IsString()
  @IsNotEmpty()
  readonly habitId: string;
}
