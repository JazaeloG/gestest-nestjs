import { 
    IsNotEmpty, 
    IsString, 
    MaxLength
} from "class-validator";

export class CreateUsuarioAdminDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    usuario_Nombre: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    usuario_Apellido: string;

}
