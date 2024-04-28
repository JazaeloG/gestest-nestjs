import { PartialType } from '@nestjs/mapped-types';
import { CreateCuentaDto } from './create-cuenta.dto';

import { Transform } from "class-transformer";

import { 
    IsNotEmpty, 
    IsString, 
    MaxLength, 
    MinLength
} from "class-validator";

export class UpdateCuentaDto extends PartialType(CreateCuentaDto) {

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    cuenta_Usuario_Nombre: string;

    @IsString()
    @IsNotEmpty()
    cuenta_Correo_Electronico: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Transform(({ value }) => value.trim())
    cuenta_Contrasena: string;

    @IsString()
    @IsNotEmpty()
    cuenta_Rol: string;

    @IsNotEmpty()
    cuenta_Fecha_Creacion: string;

}
