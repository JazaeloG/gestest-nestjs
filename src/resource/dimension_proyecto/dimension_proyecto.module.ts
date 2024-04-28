import { Module } from '@nestjs/common';
import { DimensionProyectoService } from './dimension_proyecto.service';
import { DimensionProyectoController } from './dimension_proyecto.controller';
import { DimensionProyecto } from './entities/dimension_proyecto.entity';
import { Respuesta } from '../respuesta/entities/respuesta.entity';
import { Pregunta } from '../pregunta/entities/pregunta.entity';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DimensionProyecto, Respuesta, Pregunta])],
  controllers: [DimensionProyectoController],
  providers: [DimensionProyectoService],
  exports: [DimensionProyectoService]
})
export class DimensionProyectoModule {}
