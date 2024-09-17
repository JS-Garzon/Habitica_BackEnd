import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GoalService } from './goal.service';
import { CreateGoalDto } from 'src/common/dto/create-goal.dto';
import { UpdateGoalDto } from 'src/common/dto/update-goal.dto';

@Controller('goals')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Post()
  create(@Body() payload: CreateGoalDto) {
    return this.goalService.createGoal(payload);
  }

  @Get()
  findAll() {
    return this.goalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.goalService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateGoalDto) {
    return this.goalService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.goalService.delete(id);
  }

  @Delete()
  deleteMany(@Body('ids') ids: string[]) {
    return this.goalService.deleteManyGoals(ids);
  }
}
