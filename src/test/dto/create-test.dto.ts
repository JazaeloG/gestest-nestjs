import {
    IsString,
    IsInt,
    IsOptional,
    IsArray,
    ValidateNested,
    IsNotEmpty,
} from 'class-validator';

export class CreateFormularioDto {

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

    @IsArray()
    @IsOptional()
    dimension: any;

}
