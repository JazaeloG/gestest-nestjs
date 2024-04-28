import { PartialType } from '@nestjs/mapped-types';
import { CreatePreguntaProyectoDto } from './create-pregunta_proyecto.dto';

export class UpdatePreguntaProyectoDto extends PartialType(CreatePreguntaProyectoDto) {}
