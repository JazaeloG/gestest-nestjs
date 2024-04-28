import { Test, TestingModule } from '@nestjs/testing';
import { DimensionProyectoController } from './dimension_proyecto.controller';
import { DimensionProyectoService } from './dimension_proyecto.service';

describe('DimensionProyectoController', () => {
  let controller: DimensionProyectoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DimensionProyectoController],
      providers: [DimensionProyectoService],
    }).compile();

    controller = module.get<DimensionProyectoController>(DimensionProyectoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
