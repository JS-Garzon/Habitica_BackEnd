import { Module } from '@nestjs/common';
import { HabitHistoryService } from './habit-history.service';
import { HabitHistoryController } from './habit-history.controller';
import { HabitHistory } from './entities/habit-history.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habit } from '../habits/entities/habit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HabitHistory, Habit])],
  providers: [HabitHistoryService],
  exports: [HabitHistoryService],
  controllers: [HabitHistoryController],
})
export class HabitHistoryModule {}
