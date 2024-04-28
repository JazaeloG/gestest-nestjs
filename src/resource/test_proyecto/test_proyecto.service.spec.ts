import { Test, TestingModule } from '@nestjs/testing';
import { TestProyectoService } from './test_proyecto.service';

describe('TestProyectoService', () => {
  let service: TestProyectoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestProyectoService],
    }).compile();

    service = module.get<TestProyectoService>(TestProyectoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
