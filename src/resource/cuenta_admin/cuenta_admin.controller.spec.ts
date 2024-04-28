import { Test, TestingModule } from '@nestjs/testing';
import { CuentaAdminController } from './cuenta_admin.controller';
import { CuentaAdminService } from './cuenta_admin.service';

describe('CuentaAdminController', () => {
  let controller: CuentaAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CuentaAdminController],
      providers: [CuentaAdminService],
    }).compile();

    controller = module.get<CuentaAdminController>(CuentaAdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
