import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioAdminDto } from './create-usuario_admin.dto';

import { 
    IsNotEmpty, 
    IsString, 
    MaxLength
} from "class-validator";

export class UpdateUsuarioAdminDto extends PartialType(CreateUsuarioAdminDto) {

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    usuario_Nombre: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    usuario_Apellido: string;
    
}
