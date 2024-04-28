import { LoginDto } from "../dto/login.dto";

export function Crear_Objeto_Login (Datos: any) {
    let Info: LoginDto = {
        login_Usuario: Datos.usuario,
        login_Contraseña: Datos.contraseña,
    }

    return Info;
}