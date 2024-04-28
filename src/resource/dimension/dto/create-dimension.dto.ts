import {
    IsNotEmpty,
    IsString,
    } from 'class-validator';

export class CreateDimensionDto {

    @IsString()
    @IsNotEmpty()
    dimension_Titulo: string;

    @IsString()
    @IsNotEmpty()
    dimension_Descripcion: string;

    @IsString()
    @IsNotEmpty()
    dimension_Estado: string;

    @IsNotEmpty()
    preguntas_ID: any;
}
