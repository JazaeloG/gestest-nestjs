import { Injectable } from '@nestjs/common';
import { CreateProyectoUsuarioDto } from './dto/create-proyecto_usuario.dto';
import { UpdateProyectoUsuarioDto } from './dto/update-proyecto_usuario.dto';

@Injectable()
export class ProyectoUsuarioService {
  create(createProyectoUsuarioDto: CreateProyectoUsuarioDto) {
    return 'This action adds a new proyectoUsuario';
  }

  findAll() {
    return `This action returns all proyectoUsuario`;
  }

  findOne(id: number) {
    return `This action returns a #${id} proyectoUsuario`;
  }

  update(id: number, updateProyectoUsuarioDto: UpdateProyectoUsuarioDto) {
    return `This action updates a #${id} proyectoUsuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} proyectoUsuario`;
  }
}
