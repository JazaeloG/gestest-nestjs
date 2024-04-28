import { Module } from '@nestjs/common';
import { PreguntaProyectoService } from './pregunta_proyecto.service';
import { PreguntaProyectoController } from './pregunta_proyecto.controller';
import { PreguntaProyecto } from './entities/pregunta_proyecto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PreguntaProyecto])],
  controllers: [PreguntaProyectoController],
  providers: [PreguntaProyectoService],
  exports: [PreguntaProyectoService]
})
export class PreguntaProyectoModule {}
