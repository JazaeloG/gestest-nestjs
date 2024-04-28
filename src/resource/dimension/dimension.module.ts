import { Module } from '@nestjs/common';
import { DimensionService } from './dimension.service';
import { DimensionController } from './dimension.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dimension } from './entities/dimension.entity';
import { Pregunta } from '../pregunta/entities/pregunta.entity';
import { TransaccionModule } from 'src/common/transaction/transaccion.module';

@Module({
  imports: [TypeOrmModule.forFeature([Dimension, Pregunta]),TransaccionModule],
  controllers: [DimensionController],
  providers: [DimensionService],
  exports: [DimensionService]
})
export class DimensionModule {}
