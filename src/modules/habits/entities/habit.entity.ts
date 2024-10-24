import { Goal } from '../../goal/entities/goal.entity';
import { HabitHistory } from '../../habit-history/entities/habit-history.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Habit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.habits, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  user: User;

  @OneToMany(() => HabitHistory, (history) => history.habit, { cascade: true })
  history: HabitHistory[];

  @ManyToOne(() => Goal, (goal) => goal.habit, { onDelete: 'CASCADE' })
  goals: Goal[];
}
