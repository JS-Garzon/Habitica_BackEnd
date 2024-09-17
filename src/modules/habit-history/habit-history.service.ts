import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HabitHistory } from './entities/habit-history.entity';
import { Repository } from 'typeorm';
import { CreateHabitHistoryDto } from 'src/common/dto/create-habit-history.dto';
import { UpdateHabitHistoryDto } from 'src/common/dto/update-habit-history.dto';
import { Habit } from '../habits/entities/habit.entity';
import { isValid, parseISO } from 'date-fns';

@Injectable()
export class HabitHistoryService {
  constructor(
    @InjectRepository(HabitHistory)
    private readonly habitHistoryRepository: Repository<HabitHistory>,
    @InjectRepository(Habit)
    private readonly habitRepository: Repository<Habit>,
  ) {}

  async create(
    createHabitHistoryDto: CreateHabitHistoryDto,
  ): Promise<HabitHistory> {
    const habit = await this.habitRepository.findOne({
      where: { id: createHabitHistoryDto.habitId },
    });

    if (!habit) {
      throw new NotFoundException('User not found');
    }

    const habitHistory = this.habitHistoryRepository.create({
      ...createHabitHistoryDto,
      habit,
    });
    return this.habitHistoryRepository.save(habitHistory);
  }

  async findAll(filters: any): Promise<HabitHistory[]> {
    const queryBuilder =
      this.habitHistoryRepository.createQueryBuilder('habit_history');

    if (filters.habitId) {
      queryBuilder.andWhere('habit_history.habitId = :habitId', {
        habitId: filters.habitId,
      });
    }

    if (filters.startDate && filters.endDate) {
      const startDate = parseISO(filters.startDate);
      const endDate = parseISO(filters.endDate);
      console.log(startDate, endDate);
      if (!isValid(startDate) || !isValid(endDate)) {
        throw new BadRequestException(
          'Las fechas proporcionadas no son válidas.',
        );
      }

      queryBuilder.andWhere(
        'habit_history.date BETWEEN :startDate AND :endDate',
        {
          startDate: startDate.toISOString(), // Asegúrate de que la fecha esté en el formato correcto
          endDate: endDate.toISOString(),
        },
      );
    }

    if (filters.completed !== undefined) {
      queryBuilder.andWhere('habit_history.completed = :completed', {
        completed: filters.completed,
      });
    }

    return queryBuilder.getMany();
  }

  async findOne(id: string): Promise<HabitHistory> {
    return this.habitHistoryRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateHabitHistoryDto: UpdateHabitHistoryDto,
  ): Promise<HabitHistory> {
    const habitHistory = await this.findOne(id);
    if (!habitHistory) {
      throw new NotFoundException(`Habit History with Id ${id} not found`);
    }
    Object.assign(habitHistory, updateHabitHistoryDto);
    return this.habitHistoryRepository.save(habitHistory);
  }

  async delete(id: string): Promise<void> {
    await this.habitHistoryRepository.delete(id);
  }
}
