import { Module } from '@nestjs/common';
import { TestProyectoService } from './test_proyecto.service';
import { TestProyectoController } from './test_proyecto.controller';
import { TestProyecto } from './entities/test_proyecto.entity';
import { DimensionProyecto } from '../dimension_proyecto/entities/dimension_proyecto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([TestProyecto, DimensionProyecto])
  ],
  controllers: [TestProyectoController],
  providers: [TestProyectoService],
  exports: [TestProyectoService]
})
export class TestProyectoModule {}
