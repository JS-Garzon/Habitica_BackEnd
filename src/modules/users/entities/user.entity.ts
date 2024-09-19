import { Habit } from '../../habits/entities/habit.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './roleEnum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column('enum', { enum: Role, array: true, default: [] })
  roles: string[];

  @OneToMany(() => Habit, (habit) => habit.user)
  habits: Habit[];
}
