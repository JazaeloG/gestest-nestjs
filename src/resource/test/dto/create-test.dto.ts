import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsOptional,
    } from 'class-validator';

export class CreateTestDto {

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

    @IsOptional()
    dimensiones_ID: any;

}
