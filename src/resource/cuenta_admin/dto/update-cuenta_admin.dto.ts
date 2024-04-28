import { PartialType } from '@nestjs/mapped-types';
import { CreateCuentaAdminDto } from './create-cuenta_admin.dto';

import { Transform } from "class-transformer";

import { 
    IsNotEmpty, 
    IsString, 
    MaxLength, 
    MinLength
} from "class-validator";

export class UpdateCuentaAdminDto extends PartialType(CreateCuentaAdminDto) {

    
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
