import { Injectable } from '@nestjs/common';
import { CreatePreguntaProyectoDto } from './dto/create-pregunta_proyecto.dto';
import { UpdatePreguntaProyectoDto } from './dto/update-pregunta_proyecto.dto';

@Injectable()
export class PreguntaProyectoService {
  create(createPreguntaProyectoDto: CreatePreguntaProyectoDto) {
    return 'This action adds a new preguntaProyecto';
  }

  findAll() {
    return `This action returns all preguntaProyecto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} preguntaProyecto`;
  }

  update(id: number, updatePreguntaProyectoDto: UpdatePreguntaProyectoDto) {
    return `This action updates a #${id} preguntaProyecto`;
  }

  remove(id: number) {
    return `This action removes a #${id} preguntaProyecto`;
  }
}
