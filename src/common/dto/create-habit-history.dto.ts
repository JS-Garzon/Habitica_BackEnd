import { IsOptional, IsString } from 'class-validator';

export class CreateHabitHistoryDto {
  @IsString()
  readonly habitId: string;

  @IsString()
  @IsOptional()
  readonly comment?: string;
}
