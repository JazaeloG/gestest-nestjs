import {
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class LoginDto {

    @IsNotEmpty()
    @IsString()
    login_Usuario: string;

    @IsNotEmpty()
    @IsString()
    login_Contraseña : string;
}
