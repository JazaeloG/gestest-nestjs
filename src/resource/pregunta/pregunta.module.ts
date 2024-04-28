import { Module } from '@nestjs/common';
import { PreguntaService } from './pregunta.service';
import { PreguntaController } from './pregunta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pregunta } from './entities/pregunta.entity';
import { TransaccionModule } from 'src/common/transaction/transaccion.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pregunta]), TransaccionModule],
  controllers: [PreguntaController],
  providers: [PreguntaService],
  exports: [PreguntaService]
})
export class PreguntaModule {}
