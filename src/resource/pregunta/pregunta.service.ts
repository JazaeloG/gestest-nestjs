import { Injectable } from '@nestjs/common';
import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { UpdatePreguntaDto } from './dto/update-pregunta.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository, getConnection } from 'typeorm';
import { Pregunta } from './entities/pregunta.entity';

import { Errores_Preguntas, Exito_Preguntas } from 'src/common/helpers/preguntas.helpers';
import { TransaccionService } from 'src/common/transaction/transaccion.service';
import { Tipo_Transaccion } from 'src/common/enums/tipo_Transaccion.enum';

import { PREGUNTAS_ESTADO } from 'src/common/enums/preguntas.enum';

@Injectable()
export class PreguntaService {

  constructor(
    @InjectRepository(Pregunta)
    private preguntaRepository: Repository<Pregunta>,
    private transaccionService: TransaccionService,
  ) {}

  async create(createPreguntaDto: CreatePreguntaDto) {
    let transaccion: any = await this.transaccionService.transaction(Tipo_Transaccion.Guardar, Pregunta, createPreguntaDto);

    if (transaccion.mensaje == 'Éxito') {
      return { status: 201, message: Exito_Preguntas.PREGUNTA_CREADA }
    } else {
      return { status: 400, message: Errores_Preguntas.PREGUNTA_NO_CREADA }
    }
  }

  async findAll() {
    return await this.preguntaRepository.find();
  }

  async buscarPregunta(titulo: string) {
    let transaccion: any = await this.transaccionService.transaction(Tipo_Transaccion.Consultar_Con_Parametros, Pregunta, '', 'pregunta_Titulo', titulo);

    if (transaccion == 'Error') {
      return { status: 400, message: 'Error en el sistema'};
    } else if (transaccion.length == 0) {
      return { status: 200, message: Errores_Preguntas.PREGUNTA_NO_ENCONTRADA }
    } else {
      return { status: 201, message: transaccion }
    }
  }

  findOne(id: number) {
    try {
      return {
        status: 201,
        message: this.preguntaRepository.findOneById(id)
      } 
    } catch (error) {
      return { status: 400, message: Errores_Preguntas.PREGUNTA_NO_ENCONTRADA }
    }
  }

  async update(id: number, updatePreguntaDto: UpdatePreguntaDto) {
    const pregunta_ID = id.toString();
    let transaccion: any = await this.transaccionService.transaction(Tipo_Transaccion.Actualizar_Con_Parametros, Pregunta, updatePreguntaDto, 'pregunta_Id', pregunta_ID);

    if (transaccion.mensaje == 'Éxito') {
      return { status: 201, message: Exito_Preguntas.PREGUNTA_ACTUALIZADA }
    } else {
      return { status: 400, message: Errores_Preguntas.PREGUNTA_NO_ACTUALIZADA }
    }
  }

  async remove(id: number) {
    const pregunta_ID = id.toString();
    let transaccion: any = await this.transaccionService.transaction(Tipo_Transaccion.Actualizar_Con_Parametros, Pregunta, PREGUNTAS_ESTADO.ELIMINADO, 'pregunta_Id', pregunta_ID);

    if (transaccion.mensaje == 'Éxito') {
      return { status: 201, message: Exito_Preguntas.PREGUNTA_ELIMINADA }
    } else {
      return { status: 400, message: Errores_Preguntas.PREGUNTA_NO_ELIMINADA }
    }
  }
}
