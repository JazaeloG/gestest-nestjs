import { Test, TestingModule } from '@nestjs/testing';
import { PreguntaProyectoController } from './pregunta_proyecto.controller';
import { PreguntaProyectoService } from './pregunta_proyecto.service';

describe('PreguntaProyectoController', () => {
  let controller: PreguntaProyectoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PreguntaProyectoController],
      providers: [PreguntaProyectoService],
    }).compile();

    controller = module.get<PreguntaProyectoController>(PreguntaProyectoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
