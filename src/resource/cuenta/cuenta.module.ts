import { Module } from '@nestjs/common';
import { CuentaService } from './cuenta.service';
import { CuentaController } from './cuenta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuenta } from './entities/cuenta.entity';
import { TransaccionModule } from 'src/common/transaction/transaccion.module';
import { Usuario } from '../usuario/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cuenta, Usuario]), TransaccionModule],
  controllers: [CuentaController],
  providers: [CuentaService],
  exports: [CuentaService]
})
export class CuentaModule {}
