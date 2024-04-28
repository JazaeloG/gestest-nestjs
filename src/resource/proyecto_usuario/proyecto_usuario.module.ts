import { Module } from '@nestjs/common';
import { ProyectoUsuarioService } from './proyecto_usuario.service';
import { ProyectoUsuarioController } from './proyecto_usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoUsuario } from './entities/proyecto_usuario.entity';
import { Usuario } from 'src/resource/usuario/entities/usuario.entity';
import { Test } from 'src/resource/test/entities/test.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProyectoUsuario, Usuario, Test])],
  controllers: [ProyectoUsuarioController],
  providers: [ProyectoUsuarioService],
  exports: [ProyectoUsuarioService]
})
export class ProyectoUsuarioModule {}
