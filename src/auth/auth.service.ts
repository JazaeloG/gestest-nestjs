import { Injectable } from '@nestjs/common';

import { LoginDto } from './dto/login.dto';
import { CuentaService } from 'src/resource/cuenta/cuenta.service';
import { CuentaAdminService } from 'src/resource/cuenta_admin/cuenta_admin.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { CUENTAS_ESTADO } from 'src/common/enums/cuentas.enum';
import { Exito_Cuentas, Errores_Cuentas } from 'src/common/helpers/cuentas.helpers';
import { Exito_USUARIO, Errores_USUARIO } from 'src/common/helpers/usuario.helpers';
import { Usuario } from 'src/resource/usuario/entities/usuario.entity';
import { UsuarioAdmin } from 'src/resource/usuario_admin/entities/usuario_admin.entity';
import { Cuenta } from 'src/resource/cuenta/entities/cuenta.entity';
import { CuentaAdmin } from 'src/resource/cuenta_admin/entities/cuenta_admin.entity';

import { TransaccionService } from 'src/common/transaction/transaccion.service';
import { Tipo_Transaccion } from 'src/common/enums/tipo_Transaccion.enum';
import { Crear_Objeto_Registro, Crear_Objeto_Registro_Cuenta, Crear_Objeto_Registro_CuentaAdmin, Crear_Objeto_Registro_Usuario } from './Methods/Registro.Method';
import { Crear_Objeto_Login } from './Methods/Login.Method';

@Injectable()
export class AuthService {

  constructor(
    private cuentasService: CuentaService,
    private jwtService: JwtService,
    private transaccionService: TransaccionService,
    private cuentasAdminService: CuentaAdminService
  ) { }

  async register(Data: any) {

    let ObjetoRegistro: any = Crear_Objeto_Registro(Data);

    const user = await this.cuentasService.findOneByEmail(ObjetoRegistro.registro_Correo_Electronico);
    if (user.status != 200) { return { status: 400, message: (Errores_USUARIO.USUARIO_DUPLICATED) } }

    const constraseñaCifrada = await bcrypt.hash(ObjetoRegistro.registro_Correo_Contraseña, 10);

    const ObjetoUsuario = Crear_Objeto_Registro_Usuario(ObjetoRegistro.registro_Nombre, ObjetoRegistro.registro_Apellido_Paterno, ObjetoRegistro.registro_Apellido_Materno, ObjetoRegistro.registro_Institucion);

    let nuevo_Usuario: any;
    let crear_Cuenta: any;

    try {

      nuevo_Usuario = await this.transaccionService.transaction(Tipo_Transaccion.Guardar, Usuario, ObjetoUsuario);
      if (nuevo_Usuario.mensaje == 'Error') { return { status: 400, message: Errores_USUARIO.USUARIO_NOT_CREATED }; }

      const fecha_registro: Date = new Date();
      const dia: string = fecha_registro.getDate().toString().padStart(2, '0');
      const mes: string = (fecha_registro.getMonth() + 1).toString().padStart(2, '0');
      const año: number = fecha_registro.getFullYear();
      const fecha_formateada: string = `${dia}-${mes}-${año}`;

      const ObjetoCuenta = Crear_Objeto_Registro_Cuenta(ObjetoRegistro.registro_Correo_Electronico, constraseñaCifrada, ObjetoRegistro.registro_Usuario, fecha_formateada, nuevo_Usuario.resultado.usuario_Id );
      crear_Cuenta = await this.transaccionService.transaction(Tipo_Transaccion.Guardar, Cuenta, ObjetoCuenta);
      if (crear_Cuenta.mensaje != 'Éxito') {
        await this.transaccionService.transaction(Tipo_Transaccion.Eliminar_Con_Parametros, Usuario, '', 'usuario_Id', nuevo_Usuario.resultado.usuario_Id);
        return { status: 400, message: Errores_Cuentas.CUENTA_NOT_CREATED };
      }

      return { status: 201, message: Exito_USUARIO.USUARIO_CREATED };
    } catch (error) {
      return { status: 400, message: Errores_USUARIO.USUARIO_NOT_CREATED };
    }
  }

  async register_Admin(Data: any) {

    let ObjetoRegistro: any = Crear_Objeto_Registro(Data);

    const user = await this.cuentasAdminService.findOneByEmail(ObjetoRegistro.registro_Correo_Electronico);
    if (user.status != 200) { return { status: 400, message: (Errores_USUARIO.USUARIO_DUPLICATED) } }

    const constraseñaCifrada = await bcrypt.hash(ObjetoRegistro.registro_Correo_Contraseña, 10);

    const ObjetoUsuario = Crear_Objeto_Registro_Usuario(ObjetoRegistro.registro_Nombre, ObjetoRegistro.registro_Apellido_Paterno, ObjetoRegistro.registro_Apellido_Materno, ObjetoRegistro.registro_Institucion);

    let nuevo_Usuario: any;
    let crear_Cuenta: any;

    try {

      nuevo_Usuario = await this.transaccionService.transaction(Tipo_Transaccion.Guardar, UsuarioAdmin, ObjetoUsuario);
      if (nuevo_Usuario.mensaje == 'Error') { return { status: 400, message: Errores_USUARIO.USUARIO_NOT_CREATED }; }

      const fecha_registro: Date = new Date();
      const dia: string = fecha_registro.getDate().toString().padStart(2, '0');
      const mes: string = (fecha_registro.getMonth() + 1).toString().padStart(2, '0');
      const año: number = fecha_registro.getFullYear();
      const fecha_formateada: string = `${dia}-${mes}-${año}`;

      const ObjetoCuenta = Crear_Objeto_Registro_CuentaAdmin(ObjetoRegistro.registro_Correo_Electronico, constraseñaCifrada, ObjetoRegistro.registro_Usuario, fecha_formateada, nuevo_Usuario.resultado.usuario_Id );
      crear_Cuenta = await this.transaccionService.transaction(Tipo_Transaccion.Guardar, CuentaAdmin, ObjetoCuenta);
      if (crear_Cuenta.mensaje != 'Éxito') {
        await this.transaccionService.transaction(Tipo_Transaccion.Eliminar_Con_Parametros, UsuarioAdmin, '', 'usuario_Id', nuevo_Usuario.resultado.usuario_Id);
        return { status: 400, message: Errores_Cuentas.CUENTA_NOT_CREATED };
      }

      return { status: 201, message: Exito_USUARIO.USUARIO_CREATED };
    } catch (error) {
      return { status: 400, message: Errores_USUARIO.USUARIO_NOT_CREATED };
    }
  }

  async login(loginDto: any) {

    const ObjetoLogin: LoginDto = Crear_Objeto_Login(loginDto);

    const { login_Usuario, login_Contraseña } = ObjetoLogin;

    let cuenta: any = await this.cuentasService.findOneByEmail(login_Usuario );

    if (cuenta.status == 200) { return { status: 400, message: Errores_USUARIO.USUARIO_NOT_FOUND } }

    cuenta = cuenta.message[0];

    let estadoCuenta = cuenta.cuenta_Estado;

    if (estadoCuenta == CUENTAS_ESTADO.BLOQUEADO) { return { status: 400, message: Errores_Cuentas.CUENTA_BLOQUEADA } }

    if (estadoCuenta == CUENTAS_ESTADO.ELIMINADO) { return { status: 400, message: Errores_Cuentas.CUENTA_ELIMINADA } }

    if (!(await bcrypt.compare(login_Contraseña, cuenta.cuenta_Contrasena))) { return { status: 400, message: Errores_USUARIO.PASSWORD_NOT_MATCH }; }

    const payload = { identificador: cuenta.cuenta_Correo_Electronico, role: cuenta.cuenta_Rol };

    const access_Token = await this.jwtService.signAsync(payload);

    return { access_Token, cuenta: cuenta.cuenta_Correo_Electronico, role: cuenta.cuenta_Rol, message: Exito_USUARIO.Sesion_Activa, };
  }

  async login_Admin(loginDto: any) {

    const ObjetoLogin: LoginDto = Crear_Objeto_Login(loginDto);

    const { login_Usuario, login_Contraseña } = ObjetoLogin;

    let cuenta: any = await this.cuentasAdminService.findOneByEmail(login_Usuario );

    if (cuenta.status == 200) { return { status: 400, message: Errores_USUARIO.USUARIO_NOT_FOUND } }

    cuenta = cuenta.message[0];

    let estadoCuenta = cuenta.cuenta_Estado;

    if (estadoCuenta == CUENTAS_ESTADO.BLOQUEADO) { return { status: 400, message: Errores_Cuentas.CUENTA_BLOQUEADA } }

    if (estadoCuenta == CUENTAS_ESTADO.ELIMINADO) { return { status: 400, message: Errores_Cuentas.CUENTA_ELIMINADA } }

    if (!(await bcrypt.compare(login_Contraseña, cuenta.cuenta_Contrasena))) { return { status: 400, message: Errores_USUARIO.PASSWORD_NOT_MATCH }; }

    const payload = { identificador: cuenta.cuenta_Correo_Electronico, role: cuenta.cuenta_Rol };

    const access_Token = await this.jwtService.signAsync(payload);

    return { access_Token, cuenta: cuenta.cuenta_Correo_Electronico, role: cuenta.cuenta_Rol, message: Exito_USUARIO.Sesion_Activa, };
  }
}