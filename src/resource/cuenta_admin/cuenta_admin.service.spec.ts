import { Test, TestingModule } from '@nestjs/testing';
import { CuentaAdminService } from './cuenta_admin.service';

describe('CuentaAdminService', () => {
  let service: CuentaAdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CuentaAdminService],
    }).compile();

    service = module.get<CuentaAdminService>(CuentaAdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
