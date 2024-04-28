import { Test, TestingModule } from '@nestjs/testing';
import { ProyectoUsuarioService } from './proyecto_usuario.service';

describe('ProyectoUsuarioService', () => {
  let service: ProyectoUsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProyectoUsuarioService],
    }).compile();

    service = module.get<ProyectoUsuarioService>(ProyectoUsuarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
