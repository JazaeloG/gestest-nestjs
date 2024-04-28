import { PartialType } from '@nestjs/mapped-types';
import { CreateTestDto } from './create-test.dto';

import {
    IsString,
    IsNotEmpty,
    IsNumber,
    IsOptional
} from 'class-validator';

export class UpdateTestDto extends PartialType(CreateTestDto) {

    @IsString()
    @IsNotEmpty()
    test_Titulo: string;

    @IsString()
    @IsNotEmpty()
    test_Descripcion: string;

    @IsString()
    @IsNotEmpty()
    test_Autor: string;

    @IsString()
    @IsNotEmpty()
    test_Bibliografia: string;

    @IsNumber()
    @IsOptional()
    dimension_Id: number;

}
