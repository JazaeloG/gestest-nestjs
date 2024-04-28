import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioModule } from 'src/resource/usuario/usuario.module';
import { CuentaModule } from 'src/resource/cuenta/cuenta.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/common/constants/jwt.constant';
import { TransaccionModule } from 'src/common/transaction/transaccion.module';
import { UsuarioAdminModule } from 'src/resource/usuario_admin/usuario_admin.module';
import { CuentaAdminModule } from 'src/resource/cuenta_admin/cuenta_admin.module';

@Module({
  imports: [
    UsuarioModule,
    CuentaModule,
    UsuarioAdminModule,
    CuentaAdminModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    TransaccionModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
