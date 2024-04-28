import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransaccionModule } from 'src/common/transaction/transaccion.module';
import { Pregunta } from 'src/resource/pregunta/entities/pregunta.entity';
import { Dimension } from 'src/resource/dimension/entities/dimension.entity';
import { Test } from 'src/resource/test/entities/test.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pregunta, Dimension, Test]), TransaccionModule],
  controllers: [TestController],
  providers: [TestService],
  exports: [TestService],
})
export class FormularioModule {}
