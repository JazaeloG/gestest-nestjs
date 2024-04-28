import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { ProyectoUsuario } from '../proyecto_usuario/entities/proyecto_usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, ProyectoUsuario])],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService]
})
export class UsuarioModule {}
