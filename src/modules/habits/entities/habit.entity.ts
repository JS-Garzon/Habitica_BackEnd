import { Goal } from 'src/modules/goal/entities/goal.entity';
import { HabitHistory } from 'src/modules/habit-history/entities/habit-history.entity';
import { User } from 'src/modules/users/entities/user.entity';
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

  @OneToMany(() => Goal, (goal) => goal.habit)
  goals: Goal[];
}
