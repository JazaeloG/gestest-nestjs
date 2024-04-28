import { PartialType } from '@nestjs/mapped-types';
import { CreateDimensionProyectoDto } from './create-dimension_proyecto.dto';

import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsOptional,
} from 'class-validator';

export class UpdateDimensionProyectoDto extends PartialType(CreateDimensionProyectoDto) {

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
