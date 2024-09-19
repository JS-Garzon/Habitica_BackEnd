import { Habit } from '../../habits/entities/habit.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class HabitHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => Habit, (habit) => habit.history, { onDelete: 'CASCADE' })
  habit: Habit;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date;

  @CreateDateColumn()
  date: Date;
}
