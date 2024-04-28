import { Module } from '@nestjs/common';
import { UsuarioAdminService } from './usuario_admin.service';
import { UsuarioAdminController } from './usuario_admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioAdmin } from './entities/usuario_admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioAdmin])],
  controllers: [UsuarioAdminController],
  providers: [UsuarioAdminService],
  exports: [UsuarioAdminService]
})
export class UsuarioAdminModule {}
