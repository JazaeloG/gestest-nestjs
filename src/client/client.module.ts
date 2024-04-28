import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { ProyectoUsuario } from 'src/resource/proyecto_usuario/entities/proyecto_usuario.entity';
import { Usuario } from 'src/resource/usuario/entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransaccionModule } from 'src/common/transaction/transaccion.module';
import { PreguntaProyecto } from 'src/resource/pregunta_proyecto/entities/pregunta_proyecto.entity';
import { DimensionProyecto } from 'src/resource/dimension_proyecto/entities/dimension_proyecto.entity';
import { TestProyecto } from 'src/resource/test_proyecto/entities/test_proyecto.entity';
import { Cuenta } from 'src/resource/cuenta/entities/cuenta.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProyectoUsuario, Usuario, TestProyecto, PreguntaProyecto, DimensionProyecto, Cuenta]), 
    TransaccionModule
  ],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService]
})
export class ClientModule {}
