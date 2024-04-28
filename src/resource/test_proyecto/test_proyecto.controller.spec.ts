import { Test, TestingModule } from '@nestjs/testing';
import { TestProyectoController } from './test_proyecto.controller';
import { TestProyectoService } from './test_proyecto.service';

describe('TestProyectoController', () => {
  let controller: TestProyectoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestProyectoController],
      providers: [TestProyectoService],
    }).compile();

    controller = module.get<TestProyectoController>(TestProyectoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
