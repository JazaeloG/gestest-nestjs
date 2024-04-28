import { CreateTestDto } from "src/resource/test/dto/create-test.dto";
import { CreateDimensionDto } from "src/resource/dimension/dto/create-dimension.dto";
import { CreatePreguntaDto } from "src/resource/pregunta/dto/create-pregunta.dto";
import { Pregunta_Tipos } from "src/common/enums/pregunta_Tipos.enum";
import { PREGUNTAS_ESTADO } from "src/common/enums/preguntas.enum";
import { CreateDimensionProyectoDto } from "src/resource/dimension_proyecto/dto/create-dimension_proyecto.dto";
import { CreatePreguntaProyectoDto } from "src/resource/pregunta_proyecto/dto/create-pregunta_proyecto.dto";
import { CreateTestProyectoDto } from "src/resource/test_proyecto/dto/create-test_proyecto.dto";

export function crear_Objeto_Formulario(Datos: any) {

    const formulario: any = {
        proyecto_Titulo : Datos.titulo,
        proyecto_Descripcion : Datos.descripcion,
        proyecto_Status : Datos.status,
        proyecto_VariableDependiente : Datos.variableDependiente,
        proyecto_VariableIndependiente : Datos.variableIndependiente,
        proyecto_preguntaInvestigacion : Datos.preguntaInvestigacion,
        proyecto_hipotesis : Datos.hipotesis,
        test_ID : Datos.test,
    }

    return formulario;
}

export function crear_Objeto_Test(titulo: string, descripcion: string, autor: string, bibliografia: string, dimension_Id: any) {
    let test: CreateTestProyectoDto = {
        test_Titulo: titulo,
        test_Descripcion: descripcion,
        test_Autor: autor,
        test_Bibliografia: bibliografia,
        dimensiones_ID: dimension_Id
    }

    return test;
}

export function crear_Objeto_Dimension(titulo: string, descripcion: string, ID: any) {
    let dimension: CreateDimensionProyectoDto = {
        dimension_proyecto_Titulo: titulo,
        dimension_proyecto_Descripcion: descripcion,
        dimension_proyecto_Estado: PREGUNTAS_ESTADO.ACTIVO,
        preguntas_ID: ID,
        respuestas_ID: []
    }

    return dimension;
}

export function crear_Objeto_Pregunta(titulo: string, tipo: Pregunta_Tipos, respuesta: string) {
    let pregunta: CreatePreguntaProyectoDto = {
        pregunta_Titulo: titulo,
        pregunta_Tipo: tipo,
        pregunta_Respuesta: respuesta
    }

    return pregunta;
}