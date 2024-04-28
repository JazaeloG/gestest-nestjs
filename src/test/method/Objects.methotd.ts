import { CreateTestDto } from "src/resource/test/dto/create-test.dto";
import { CreateFormularioDto } from "../dto/create-test.dto";
import { CreateDimensionDto } from "src/resource/dimension/dto/create-dimension.dto";
import { CreatePreguntaDto } from "src/resource/pregunta/dto/create-pregunta.dto";
import { Pregunta_Tipos } from "src/common/enums/pregunta_Tipos.enum";
import { PREGUNTAS_ESTADO } from "src/common/enums/preguntas.enum";

export function crear_Objeto_Formulario(Datos: any) {

    const formulario: CreateFormularioDto = {
        test_Titulo: Datos.titulo,
        test_Descripcion: Datos.descripcion,
        test_Autor: Datos.autor,
        test_Bibliografia: Datos.bibliografia,
        dimension: Datos.dimension,
    }

    return formulario;
}

export function crear_Objeto_Test(titulo: string, descripcion: string, autor: string, bibliografia: string, dimension_Id: any) {
    let test: CreateTestDto = {
        test_Titulo: titulo,
        test_Descripcion: descripcion,
        test_Autor: autor,
        test_Bibliografia: bibliografia,
        dimensiones_ID: dimension_Id
    }

    return test;
}

export function crear_Objeto_Dimension(titulo: string, descripcion: string, ID: any) {
    let dimension: CreateDimensionDto = {
        dimension_Titulo: titulo,
        dimension_Descripcion: descripcion,
        dimension_Estado: PREGUNTAS_ESTADO.ACTIVO,
        preguntas_ID: ID
    }

    return dimension;
}

export function crear_Objeto_Pregunta(titulo: string, tipo: Pregunta_Tipos, respuesta: string) {
    let pregunta: CreatePreguntaDto = {
        pregunta_Titulo: titulo,
        pregunta_Tipo: tipo,
        pregunta_Respuesta: respuesta
    }

    return pregunta;
}