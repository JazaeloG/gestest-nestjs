import { CreateCuentaDto } from "src/resource/cuenta/dto/create-cuenta.dto";
import { RegisterDto } from "../dto/registro.dto";
import { CreateUsuarioDto } from "src/resource/usuario/dto/create-usuario.dto";
import { Roles } from "src/common/enums/roles.enum";

export function Crear_Objeto_Registro(Datos: any) {
    let Info: RegisterDto = {
        registro_Nombre: Datos.nombre,
        registro_Apellido_Paterno: Datos.apellidoPaterno,
        registro_Apellido_Materno: Datos.apellidoMaterno,
        registro_Usuario: Datos.usuario,
        registro_Correo_Electronico: Datos.correo,
        registro_Correo_Contraseña: Datos.contraseña,
        registro_Institucion: Datos.institucion,
    }

    return Info;
}

export function Crear_Objeto_Registro_Usuario(nombre: string, apellidoPaterno: string, apellidoMaterno: string, institucion: string) {

    const usuario_Apellidos = apellidoPaterno + ' ' + apellidoMaterno;

    let Info: CreateUsuarioDto = {
        usuario_Nombre: nombre,
        usuario_Apellido: usuario_Apellidos,
        usuario_Institucion: institucion,
    }

    return Info;
}

export function Crear_Objeto_Registro_Cuenta(correo: string, contraseña: string, usuario: string, fecha_creacion: string, usuario_Id: any) {

    let Info: CreateCuentaDto = {
        cuenta_Usuario_Nombre: usuario,
        cuenta_Correo_Electronico: correo,
        cuenta_Contrasena: contraseña,
        cuenta_Rol: Roles.USUARIO,
        cuenta_Fecha_Creacion: fecha_creacion,
        usuario_Id: usuario_Id
    }

    return Info;
}

export function Crear_Objeto_Registro_CuentaAdmin(correo: string, contraseña: string, usuario: string, fecha_creacion: string, usuario_Id: any) {

    let Info: CreateCuentaDto = {
        cuenta_Usuario_Nombre: usuario,
        cuenta_Correo_Electronico: correo,
        cuenta_Contrasena: contraseña,
        cuenta_Rol: Roles.ADMIN,
        cuenta_Fecha_Creacion: fecha_creacion,
        usuario_Id: usuario_Id
    }

    return Info;
}