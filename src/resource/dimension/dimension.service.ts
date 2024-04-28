import { Injectable } from '@nestjs/common';
import { CreateDimensionDto } from './dto/create-dimension.dto';
import { UpdateDimensionDto } from './dto/update-dimension.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository, getConnection } from 'typeorm';
import { Dimension } from './entities/dimension.entity';

import { Errores_Dimension, Exito_Dimension } from 'src/common/helpers/dimension.helpers';

import { TransaccionService } from 'src/common/transaction/transaccion.service';
import { Tipo_Transaccion } from 'src/common/enums/tipo_Transaccion.enum';

import { PREGUNTAS_ESTADO } from 'src/common/enums/preguntas.enum';

@Injectable()
export class DimensionService {

  constructor(
    @InjectRepository(Dimension)
    private dimensionRepository: Repository<Dimension>,
    private transaccionService: TransaccionService,
  ) {}

  create(createDimensionDto: CreateDimensionDto) {
    return 'This action adds a new dimension';
  }

  async findAll() {
    return await this.dimensionRepository.find();
  }

  async findOne(id: number) {
    try {
      return {
        status: 201,
        message: this.dimensionRepository.findOneById(id)
      } 
    } catch (error) {
      return { status: 400, message: Errores_Dimension.ERROR_BUSCAR_DIMENSION }
    }
  }

  async update(id: number, updateDimensionDto: UpdateDimensionDto) {
    const dimension_ID = id.toString();
    let transaccion: any = await this.transaccionService.transaction(Tipo_Transaccion.Actualizar, Dimension, updateDimensionDto, dimension_ID);

    if (transaccion.mensaje == 'Éxito') {
      return { status: 201, message: Exito_Dimension.EXITO_ACTUALIZAR_DIMENSION }
    } else {
      return { status: 400, message: Errores_Dimension.ERROR_ACTUALIZAR_DIMENSION }
    }
  }

  remove(id: number) {
    const dimension_ID = id.toString();

    let transaccion: any = this.transaccionService.transaction(Tipo_Transaccion.Actualizar_Con_Parametros, Dimension, PREGUNTAS_ESTADO.ELIMINADO, dimension_ID);

    if (transaccion.mensaje == 'Éxito') {
      return { status: 201, message: Exito_Dimension.EXITO_ELIMINAR_DIMENSION }
    } else {
      return { status: 400, message: Errores_Dimension.ERROR_ELIMINAR_DIMENSION }
    }
  }
}
