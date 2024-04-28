import { Test, TestingModule } from '@nestjs/testing';
import { ProyectoUsuarioController } from './proyecto_usuario.controller';
import { ProyectoUsuarioService } from './proyecto_usuario.service';

describe('ProyectoUsuarioController', () => {
  let controller: ProyectoUsuarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProyectoUsuarioController],
      providers: [ProyectoUsuarioService],
    }).compile();

    controller = module.get<ProyectoUsuarioController>(ProyectoUsuarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
