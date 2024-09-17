import { Test, TestingModule } from '@nestjs/testing';
import { HabitHistoryService } from './habit-history.service';

describe('HabitHistoryService', () => {
  let service: HabitHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HabitHistoryService],
    }).compile();

    service = module.get<HabitHistoryService>(HabitHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
