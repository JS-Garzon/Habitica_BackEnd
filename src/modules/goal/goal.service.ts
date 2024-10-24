import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGoalDto } from 'src/common/dto/create-goal.dto';
import { UpdateGoalDto } from 'src/common/dto/update-goal.dto';
import { In, Repository } from 'typeorm';
import { Habit } from '../habits/entities/habit.entity';
import { Goal } from './entities/goal.entity';

@Injectable()
export class GoalService {
  constructor(
    @InjectRepository(Goal)
    private readonly goalRepository: Repository<Goal>,
    @InjectRepository(Habit)
    private readonly habitRepository: Repository<Habit>,
  ) {}
  //change
  async createGoal(createGoalDto: CreateGoalDto): Promise<Goal> {
    console.log(createGoalDto);
    const habit = await this.habitRepository.findOne({
      where: { id: createGoalDto.habitId },
    });

    if (!habit) {
      throw new NotFoundException('Habit not found');
    }

    const goal = this.goalRepository.create({
      ...createGoalDto,
      habits: [habit],
    });

    return this.goalRepository.save(goal);
  }

  findAll(): Promise<Goal[]> {
    return this.goalRepository.find({
      relations: ['habits'],
    });
  }

  findOne(id: string): Promise<Goal> {
    return this.goalRepository.findOne({
      where: { id },
      relations: ['habits'],
    });
  }

  async update(id: string, updateGoalDto: UpdateGoalDto): Promise<Goal> {
    const goal = await this.findOne(id);
    if (!goal) {
      throw new NotFoundException(`Goal with id ${id} not found`);
    }
    if (updateGoalDto.habitId) {
      const habit = await this.habitRepository.findOne({
        where: { id: updateGoalDto.habitId },
      });

      if (!habit) {
        throw new NotFoundException('Habit not found');
      }

      goal.habits = [...goal.habits, habit];
    }

    Object.assign(goal, updateGoalDto);
    console.log(goal);
    return this.goalRepository.save(goal);
  }

  async delete(id: string): Promise<void> {
    await this.goalRepository.delete(id);
  }

  async deleteManyGoals(ids: string[]): Promise<void> {
    await this.goalRepository.delete({ id: In(ids) });
  }
}
