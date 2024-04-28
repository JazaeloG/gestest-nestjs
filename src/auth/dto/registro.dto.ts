import { Transform } from 'class-transformer';
import {
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export class RegisterDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    registro_Nombre: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    registro_Apellido_Paterno: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    registro_Apellido_Materno: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    registro_Usuario: string;
    
    @IsNotEmpty()
    @IsString()
    registro_Correo_Electronico: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Transform(({ value }) => value.trim())
    registro_Correo_Contraseña : string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    registro_Institucion: string;

}
