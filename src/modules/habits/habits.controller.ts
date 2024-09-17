import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { HabitsService } from './habits.service';
import { CreateHabitDto } from 'src/common/dto/create-habit.dto';
import { UpdateHabitDto } from 'src/common/dto/update-habit.dto';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Post()
  create(@Body() createHabitDto: CreateHabitDto) {
    return this.habitsService.create(createHabitDto);
  }

  @Get()
  findAll() {
    return this.habitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habitsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateHabitDto) {
    return this.habitsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.habitsService.delete(id);
  }

  @Delete()
  deleteMany(@Body('ids') ids: string[]) {
    return this.habitsService.deleteMany(ids);
  }
}
