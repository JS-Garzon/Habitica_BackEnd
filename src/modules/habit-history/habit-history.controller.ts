import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { HabitHistoryService } from './habit-history.service';
import { CreateHabitHistoryDto } from 'src/common/dto/create-habit-history.dto';
import { UpdateHabitHistoryDto } from 'src/common/dto/update-habit-history.dto';

@Controller('habit-history')
export class HabitHistoryController {
  constructor(private readonly habitHistoryService: HabitHistoryService) {}

  @Post()
  create(@Body() createHabitHistoryDto: CreateHabitHistoryDto) {
    return this.habitHistoryService.create(createHabitHistoryDto);
  }

  @Get()
  async findAll(
    @Query('habitId') habitId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('completed') completed?: boolean,
  ) {
    const filters = { habitId, startDate, endDate, completed };
    return this.habitHistoryService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habitHistoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateHabitHistoryDto) {
    return this.habitHistoryService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.habitHistoryService.delete(id);
  }
}
