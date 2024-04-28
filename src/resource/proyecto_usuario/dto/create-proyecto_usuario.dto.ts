import {
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    MaxLength,
} from 'class-validator';

export class CreateProyectoUsuarioDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    proyecto_Titulo: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    proyecto_Descripcion: string;

    @IsNotEmpty()
    proyecto_Status: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    proyecto_VariableDependiente: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    proyecto_VariableIndependiente: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    proyecto_preguntaInvestigacion: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    proyecto_hipotesis: string;

    @IsNotEmpty()
    test_ID: any;

    @IsNotEmpty()
    usuario_ID: any;

}
