import { Test, TestingModule } from '@nestjs/testing';
import { DimensionProyectoService } from './dimension_proyecto.service';

describe('DimensionProyectoService', () => {
  let service: DimensionProyectoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DimensionProyectoService],
    }).compile();

    service = module.get<DimensionProyectoService>(DimensionProyectoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
