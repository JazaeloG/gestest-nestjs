import { PartialType } from '@nestjs/mapped-types';
import { CreateDimensionDto } from './create-dimension.dto';

import {
    IsNotEmpty,
    IsString,
    } from 'class-validator';

export class UpdateDimensionDto extends PartialType(CreateDimensionDto) {

    @IsString()
    @IsNotEmpty()
    dimension_Titulo: string;

    @IsString()
    @IsNotEmpty()
    dimension_Descripcion: string;

    @IsString()
    @IsNotEmpty()
    dimension_Estado: string;

    @IsString()
    @IsNotEmpty()
    pregunta_Id: string;

}
