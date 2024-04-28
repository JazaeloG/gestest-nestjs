import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsOptional,
} from 'class-validator';

export class CreateDimensionProyectoDto {

    @IsString()
    @IsNotEmpty()
    dimension_proyecto_Titulo: string;

    @IsString()
    @IsNotEmpty()
    dimension_proyecto_Descripcion: string;

    @IsString()
    @IsNotEmpty()
    dimension_proyecto_Estado: string;

    @IsOptional()
    preguntas_ID: any;

    @IsOptional()
    respuestas_ID: any;

}
