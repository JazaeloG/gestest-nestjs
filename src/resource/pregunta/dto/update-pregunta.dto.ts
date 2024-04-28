import { PartialType } from '@nestjs/mapped-types';
import { CreatePreguntaDto } from './create-pregunta.dto';

import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsOptional,
    } from 'class-validator';

export class UpdatePreguntaDto extends PartialType(CreatePreguntaDto) {

    @IsString()
    @IsNotEmpty()
    pregunta_Titulo: string;

    @IsString()
    @IsNotEmpty()
    pregunta_Tipo: string;

    @IsString()
    @IsNotEmpty()
    pregunta_Respuesta: string;


}
