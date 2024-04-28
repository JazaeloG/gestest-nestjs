import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';

import { 
    IsNotEmpty, 
    IsString, 
    MaxLength
} from "class-validator";

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    usuario_Nombre: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    usuario_Apellido: string;

    @IsString()
    @IsNotEmpty()
    usuario_Institucion: string;
}
