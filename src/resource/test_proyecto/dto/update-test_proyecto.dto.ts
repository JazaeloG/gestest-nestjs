import { PartialType } from '@nestjs/mapped-types';
import { CreateTestProyectoDto } from './create-test_proyecto.dto';

export class UpdateTestProyectoDto extends PartialType(CreateTestProyectoDto) {}
