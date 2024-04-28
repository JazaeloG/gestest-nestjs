import { Test, TestingModule } from '@nestjs/testing';
import { PreguntaProyectoService } from './pregunta_proyecto.service';

describe('PreguntaProyectoService', () => {
  let service: PreguntaProyectoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PreguntaProyectoService],
    }).compile();

    service = module.get<PreguntaProyectoService>(PreguntaProyectoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
