import { Module } from '@nestjs/common';
import { GoalController } from './goal.controller';
import { GoalService } from './goal.service';
import { Goal } from './entities/goal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habit } from '../habits/entities/habit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Goal, Habit])],
  controllers: [GoalController],
  providers: [GoalService],
})
export class GoalModule {}
