import { Module } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habit } from './entities/habit.entity';
import { HabitsController } from './habits.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Habit])],
  providers: [HabitsService],
  exports: [HabitsService],
  controllers: [HabitsController],
})
export class HabitsModule {}
