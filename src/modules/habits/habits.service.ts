import { Injectable, NotFoundException } from '@nestjs/common';
import { Habit } from './entities/habit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHabitDto } from 'src/common/dto/create-habit.dto';
import { UpdateHabitDto } from 'src/common/dto/update-habit.dto';

@Injectable()
export class HabitsService {
  constructor(
    @InjectRepository(Habit)
    private readonly habitRepository: Repository<Habit>,
  ) {}

  async create(createHabitDto: CreateHabitDto): Promise<Habit> {
    const habit = this.habitRepository.create(createHabitDto);
    return this.habitRepository.save(habit);
  }

  async findAll(): Promise<Habit[]> {
    return this.habitRepository.find();
  }

  async findOne(id: string): Promise<Habit> {
    return this.habitRepository.findOne({ where: { id } });
  }

  async update(id: string, updateHabitDto: UpdateHabitDto): Promise<Habit> {
    const habit = await this.findOne(id);
    if (!habit) {
      throw new NotFoundException(`Habit with Id ${id} not found`);
    }
    Object.assign(habit, updateHabitDto);
    return this.habitRepository.save(habit);
  }

  async delete(id: string): Promise<void> {
    await this.habitRepository.delete(id);
  }
}
