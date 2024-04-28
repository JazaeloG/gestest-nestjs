import { PartialType } from '@nestjs/mapped-types';
import { CreateFormularioDto } from './create-test.dto';

export class UpdateFormulariotDto extends PartialType(CreateFormularioDto) {}
