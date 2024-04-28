import { Errores_Preguntas } from 'src/common/helpers/preguntas.helpers';
import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsOptional,
    Validate,
    } from 'class-validator';

export class CreatePreguntaDto {

    @IsString()
    @IsNotEmpty()
    pregunta_Titulo: string;

    @IsString()
    @IsNotEmpty()
    pregunta_Tipo: string;

    @IsString()
    @IsOptional()
    pregunta_Respuesta: string;

}
