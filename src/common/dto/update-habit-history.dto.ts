import { PartialType } from '@nestjs/mapped-types';
import { CreateHabitHistoryDto } from './create-habit-history.dto';

export class UpdateHabitHistoryDto extends PartialType(CreateHabitHistoryDto) {}
