import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { HabitsModule } from './modules/habits/habits.module';
import { UsersModule } from './modules/users/users.module';
import { AppService } from './app.service';
import { HabitHistoryModule } from './modules/habit-history/habit-history.module';
import { AuthModule } from './modules/auth/auth.module';
import { GoalModule } from './modules/goal/goal.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UsersModule,
    HabitsModule,
    HabitHistoryModule,
    AuthModule,
    GoalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
