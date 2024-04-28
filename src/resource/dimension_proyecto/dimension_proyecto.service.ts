import { Injectable } from '@nestjs/common';
import { CreateDimensionProyectoDto } from './dto/create-dimension_proyecto.dto';
import { UpdateDimensionProyectoDto } from './dto/update-dimension_proyecto.dto';

@Injectable()
export class DimensionProyectoService {
  create(createDimensionProyectoDto: CreateDimensionProyectoDto) {
    return 'This action adds a new dimensionProyecto';
  }

  findAll() {
    return `This action returns all dimensionProyecto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dimensionProyecto`;
  }

  update(id: number, updateDimensionProyectoDto: UpdateDimensionProyectoDto) {
    return `This action updates a #${id} dimensionProyecto`;
  }

  remove(id: number) {
    return `This action removes a #${id} dimensionProyecto`;
  }
}
