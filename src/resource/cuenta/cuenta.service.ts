import { Injectable } from '@nestjs/common';
import { CreateCuentaDto } from './dto/create-cuenta.dto';
import { UpdateCuentaDto } from './dto/update-cuenta.dto';


import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository, getConnection } from 'typeorm';
import { Cuenta } from './entities/cuenta.entity';

import { Errores_Cuentas, Exito_Cuentas } from 'src/common/helpers/cuentas.helpers';

import { CUENTAS_ESTADO } from 'src/common/enums/cuentas.enum';
import * as bcrypt from 'bcrypt';

import { TransaccionService } from 'src/common/transaction/transaccion.service';
import { Tipo_Transaccion } from 'src/common/enums/tipo_Transaccion.enum';

@Injectable()
export class CuentaService {

  constructor(
    @InjectRepository(Cuenta)
    private cuentaRepository: Repository<Cuenta>,
    private transaccionService: TransaccionService
  ) {}

  create(createCuentaDto: CreateCuentaDto) {
    return 'This action adds a new cuenta';
  }

  findAll() {
    return `This action returns all cuenta`;
  }

  async findOneByEmail(usuario: string) {

    let transaccion: any = await this.transaccionService.transaction(Tipo_Transaccion.Consultar_Con_Parametros, Cuenta, '', 'cuenta_Usuario_Nombre', usuario);
    console.log("buscando");
    if ( transaccion == 'Error' ) {
      return { status: 400, message: 'Error en el sistema' }
    } else if (transaccion.length == 0) {
      return { status: 200, message: Errores_Cuentas.CUENTA_NOT_FOUND }
    } else {
      return { status: 201, message: transaccion }
    }
  }

  async actualizarContrasena(email: string, contrasena: string) {

    let cuenta_Usuario: any = await this.transaccionService.transaction(Tipo_Transaccion.Consultar_Con_Parametros, Cuenta, '', 'cuenta_Correo_Electronico', email);

    if ( cuenta_Usuario == 'Error' ) {
      return {
        status: 400,
        message: Errores_Cuentas.CUENTA_NOT_FOUND
      }
    }

    let cuenta_ID = cuenta_Usuario.cuenta_Id;

    const contraseña_Cifrada = await bcrypt.hash(contrasena, 10);

    let transaccion = await this.transaccionService.transaction(Tipo_Transaccion.Actualizar_Con_Parametros, Cuenta, contraseña_Cifrada, 'cuenta_Contrasena', cuenta_ID);

    if ( transaccion == 'Error' ) {
      return {
        status: 400,
        message: Errores_Cuentas.CONTRASEÑA_NO_ACTUALIZADA
      } 
    } else {
      return {
        status: 201,
        message: Exito_Cuentas.CONTRASEÑA_ACTUALIZADA
      }
    }
  }

  async EliminarCuenta(email: string) {

    let cuenta_Usuario: any = await this.transaccionService.transaction(Tipo_Transaccion.Consultar_Con_Parametros, Cuenta, '', 'cuenta_Correo_Electronico', email);

    if ( cuenta_Usuario == 'Error' ) {
      return {
        status: 400,
        message: Errores_Cuentas.CUENTA_NOT_FOUND
      }
    }

    let cuenta_ID = cuenta_Usuario.cuenta_Id;

    let resultado = await this.transaccionService.transaction(Tipo_Transaccion.Actualizar_Con_Parametros, Cuenta, CUENTAS_ESTADO.ELIMINADO, 'cuenta_Estado_Cuenta', cuenta_ID);

    if ( resultado == 'Error' ) {
      return {
        status: 400,
        message: Errores_Cuentas.CUENTA_NO_ELIMINADA
      }
    } else {
      return {
        status: 201,
        message: Exito_Cuentas.CUENTA_ELIMINADA
      }
    }

  }

  findOne(id: number) {
    return `This action returns a #${id} cuenta`;
  }

  update(id: number, updateCuentaDto: UpdateCuentaDto) {
    return `This action updates a #${id} cuenta`;
  }

  remove(id: number) {
    return `This action removes a #${id} cuenta`;
  }
}
