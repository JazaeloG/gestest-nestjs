import { Module } from '@nestjs/common';
import { CuentaAdminService } from './cuenta_admin.service';
import { CuentaAdminController } from './cuenta_admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CuentaAdmin } from './entities/cuenta_admin.entity';
import { UsuarioAdmin } from '../usuario_admin/entities/usuario_admin.entity';
import { TransaccionModule } from 'src/common/transaction/transaccion.module';

@Module({
  imports: [TypeOrmModule.forFeature([CuentaAdmin, UsuarioAdmin]), TransaccionModule],
  controllers: [CuentaAdminController],
  providers: [CuentaAdminService],
  exports: [CuentaAdminService]
})
export class CuentaAdminModule {}
