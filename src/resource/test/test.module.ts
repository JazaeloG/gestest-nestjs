import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './entities/test.entity';
import { Dimension } from 'src/resource/dimension/entities/dimension.entity';
import { TransaccionModule } from 'src/common/transaction/transaccion.module';

@Module({
  imports: [TypeOrmModule.forFeature([Test, Dimension]), TransaccionModule],
  controllers: [TestController],
  providers: [TestService],
  exports: [TestService]
})
export class TestModule {}
