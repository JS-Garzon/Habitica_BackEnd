import { Habit } from 'src/modules/habits/entities/habit.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Goal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @ManyToOne(() => Habit, (habit) => habit.goals, { onDelete: 'CASCADE' })
  habit: Habit;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  finishDate: Date;
}
