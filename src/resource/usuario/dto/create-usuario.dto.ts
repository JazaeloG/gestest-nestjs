import { 
    IsNotEmpty, 
    IsString, 
    MaxLength
} from "class-validator";

export class CreateUsuarioDto {

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
