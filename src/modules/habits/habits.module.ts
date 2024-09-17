import { Module } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habit } from './entities/habit.entity';
import { HabitsController } from './habits.controller';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Habit, User])],
  providers: [HabitsService],
  exports: [HabitsService],
  controllers: [HabitsController],
})
export class HabitsModule {}
