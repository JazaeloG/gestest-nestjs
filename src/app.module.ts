import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CuentaModule } from './resource/cuenta/cuenta.module';
import { UsuarioModule } from './resource/usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { CuentaAdminModule } from './resource/cuenta_admin/cuenta_admin.module';
import { UsuarioAdminModule } from './resource/usuario_admin/usuario_admin.module';
import { PreguntaModule } from './resource/pregunta/pregunta.module';
import { DimensionModule } from './resource/dimension/dimension.module';
import { FormularioModule } from './test/test.module';
import { TestModule } from './resource/test/test.module';
import { DimensionProyectoModule } from './resource/dimension_proyecto/dimension_proyecto.module';
import { RespuestaModule } from './resource/respuesta/respuesta.module';
import { ProyectoUsuarioModule } from './resource/proyecto_usuario/proyecto_usuario.module';
import { ClientModule } from './client/client.module';
import { PreguntaProyectoModule } from './resource/pregunta_proyecto/pregunta_proyecto.module';
import { TestProyectoModule } from './resource/test_proyecto/test_proyecto.module';

const dotenv_Config = require('dotenv').config();
const secret = dotenv_Config.parsed;
const host = secret.PGHOST;
const user = secret.PGUSER;
const password = secret.PGPASSWORD;
const database = secret.PGDATABASE;

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: host,
      port: 5432,
      username: user,
      password: password,
      database: database,
      autoLoadEntities: true,
      synchronize: true,
      extra: {
        ssl: true,
        sslmode: 'require',
      },
    }),
    CuentaModule,
    UsuarioModule,
    AuthModule,
    CuentaAdminModule,
    UsuarioAdminModule,
    PreguntaModule,
    DimensionModule,
    TestModule,
    FormularioModule,
    DimensionProyectoModule,
    RespuestaModule,
    ProyectoUsuarioModule,
    ClientModule,
    PreguntaProyectoModule,
    TestProyectoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
