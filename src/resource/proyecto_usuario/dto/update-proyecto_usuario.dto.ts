import { PartialType } from '@nestjs/mapped-types';
import { CreateProyectoUsuarioDto } from './create-proyecto_usuario.dto';

export class UpdateProyectoUsuarioDto extends PartialType(CreateProyectoUsuarioDto) {}
