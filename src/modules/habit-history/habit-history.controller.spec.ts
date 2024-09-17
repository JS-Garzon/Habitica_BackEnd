import { Test, TestingModule } from '@nestjs/testing';
import { HabitHistoryController } from './habit-history.controller';

describe('HabitHistoryController', () => {
  let controller: HabitHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HabitHistoryController],
    }).compile();

    controller = module.get<HabitHistoryController>(HabitHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
