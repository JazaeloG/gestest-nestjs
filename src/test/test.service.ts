import { Injectable } from '@nestjs/common';
import { CreateFormularioDto } from './dto/create-test.dto';
import { UpdateFormulariotDto } from './dto/update-test.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository, getConnection } from 'typeorm';

import { TransaccionService } from 'src/common/transaction/transaccion.service';
import { Tipo_Transaccion } from 'src/common/enums/tipo_Transaccion.enum';

import { Test } from 'src/resource/test/entities/test.entity';
import { Pregunta } from 'src/resource/pregunta/entities/pregunta.entity';
import { Dimension } from 'src/resource/dimension/entities/dimension.entity';

import { Errores_Test, Exito_Test } from 'src/common/helpers/test.helpers';
import { Errores_Dimension, Exito_Dimension } from 'src/common/helpers/dimension.helpers';
import { Errores_Preguntas, Exito_Preguntas } from 'src/common/helpers/preguntas.helpers';
import { crear_Objeto_Dimension, crear_Objeto_Formulario, crear_Objeto_Pregunta, crear_Objeto_Test } from './method/Objects.methotd';
import { PREGUNTAS_ESTADO } from 'src/common/enums/preguntas.enum';
import { User_Interface } from 'src/common/interfaces/user.interface';
import { validateAdmin } from 'src/auth/guard/validateRole.guard';

@Injectable()
export class TestService {

  constructor(
    private transaccionService: TransaccionService,
    @InjectRepository(Test)
    private testRepository: Repository<Test>,
    @InjectRepository(Dimension)
    private dimensionRepository: Repository<Dimension>,
    @InjectRepository(Pregunta)
    private preguntaRepository: Repository<Pregunta>,
  ) { }

  async create(createTestDto: any, user: User_Interface) {

    const validacion = validateAdmin(user);
  
    if (validacion != true) {
      return {
        status: 400,
        message: validacion
      };
    }

    let test_Objeto = crear_Objeto_Formulario(createTestDto);

    for (let i = 0; i < test_Objeto.dimension.length; i++) {
      let guardar_Preguntas = await this.registrar_Preguntas(test_Objeto.dimension[i].preguntas);
      test_Objeto.dimension[i].preguntas = guardar_Preguntas;
    }

    let dimensiones_Almacenadas = [];

    for (let i = 0; i < test_Objeto.dimension.length; i++) {
      let guardar_Dimensiones: any = await this.registrar_Dimensiones(test_Objeto.dimension[i]);
      dimensiones_Almacenadas.push(guardar_Dimensiones.message);
    }

    let dimensiones: any = [];

    for (let i = 0; i < dimensiones_Almacenadas.length; i++) {
      for (let j = 0; j < dimensiones_Almacenadas[i].length; j++) {
        dimensiones.push(dimensiones_Almacenadas[i][j]);
      }
    }

    test_Objeto.dimension = dimensiones;

    let test_Creado: any = await this.registrar_Test(test_Objeto);

    return {
      status: 201,
      message: test_Creado
    }
  }

  async modificar_Test(Datos: any) {

    let test_Objeto = crear_Objeto_Formulario(Datos);

    for (let i = 0; i < test_Objeto.dimension.length; i++) {
      let guardar_Preguntas = await this.registrar_Preguntas(test_Objeto.dimension[i].preguntas);
      console.log(guardar_Preguntas, 1);
      test_Objeto.dimension[i].preguntas = guardar_Preguntas;
    }

    let dimensiones_Almacenadas = [];

    for (let i = 0; i < test_Objeto.dimension.length; i++) {
      let guardar_Dimensiones: any = await this.registrar_Dimensiones(test_Objeto.dimension[i]);
      
      if (guardar_Dimensiones.status == 400) {
        return {
          status: 400,
          message: guardar_Dimensiones.message
        }
      } else {
        console.log(guardar_Dimensiones.message, 2);
        dimensiones_Almacenadas.push(guardar_Dimensiones.message);
      }
    }

    test_Objeto.dimension = dimensiones_Almacenadas;

    let test_Creado: any = await this.registrar_Test(test_Objeto);

    return {
      status: 201,
      message: test_Creado
    }

  }

  async registrar_Test(test: any) {

    let test_Objeto = crear_Objeto_Test(test.test_Titulo, test.test_Descripcion, test.test_Autor, test.test_Bibliografia, test.dimension);

    const test_Buscar: any = await this.transaccionService.transaction(Tipo_Transaccion.Consultar_Con_Parametros, Test, '', 'test_Titulo', test_Objeto.test_Titulo);

    let test_Creado: any;

    if (test_Buscar.length != 0) {
      test_Creado = await this.transaccionService.transaction(Tipo_Transaccion.Actualizar, Test, test_Objeto, '', test_Buscar[0].test_Id);
    } else {
      test_Creado = await this.transaccionService.transaction(Tipo_Transaccion.Guardar, Test, test_Objeto);
    }

    if (test_Creado == "Error") {
      return {
        status: 400,
        message: Errores_Test.TEST_NO_CREADO
      };
    } else {
      return {
        status: 201,
        message: Exito_Test.TEST_CREADO
      }
    }

  }

  async registrar_Dimensiones(dimensiones: any) {
    let dimensiones_Creadas = [];
    let buscar_dimension: any = await this.transaccionService.transaction(Tipo_Transaccion.Consultar_Con_Parametros, Dimension, '', 'dimension_Titulo', dimensiones.dimension_titulo);
    console.log(buscar_dimension, "Buscar Dimension");
    let dimension_Creada: any;
    let bandera = false;
    if (buscar_dimension.length != 0) {
      const dimension = crear_Objeto_Dimension(dimensiones.dimension_titulo, dimensiones.dimension_descripcion, dimensiones.preguntas);
      dimension_Creada = await this.transaccionService.transaction(Tipo_Transaccion.Actualizar, Dimension, dimension, '', buscar_dimension[0].dimension_Id);
      dimension_Creada.resultado.dimension_Id = buscar_dimension[0].dimension_Id;
    } else {
      const dimension = crear_Objeto_Dimension(dimensiones.dimension_titulo, dimensiones.dimension_descripcion, dimensiones.preguntas);
      dimension_Creada = await this.transaccionService.transaction(Tipo_Transaccion.Guardar, Dimension, dimension);
    }
    if (dimension_Creada == "Error") {
      bandera = true;
      return {
        status: 400,
        message: Errores_Dimension.ERROR_CREAR_DIMENSION
      }
    } else {
      dimensiones_Creadas.push(dimension_Creada.resultado.dimension_Id);
    }

    if (bandera == false) {
      console.log(dimension_Creada, "Dimension Creada")
      return {
        status: 201,
        message: dimensiones_Creadas[0]
      };
    } else {
      return {
        status: 400,
        message: Errores_Dimension.ERROR_CREAR_DIMENSION
      }
    }
  }

  async registrar_Preguntas(preguntas: any) {
    let preguntas_Creadas = [];
    let pregunta_Creada: any;

    for (let i = 0; i < preguntas.length; i++) {
      let buscar_pregunta: any = await this.transaccionService.transaction(Tipo_Transaccion.Consultar_Con_Parametros, Pregunta, '', 'pregunta_Titulo', preguntas[i].Titulo);
      console.log(buscar_pregunta, "Buscar");
      const pregunta = crear_Objeto_Pregunta(preguntas[i].Titulo, preguntas[i].Tipo, preguntas[i].Opciones);
      console.log(pregunta, "Pregunta");
      if (buscar_pregunta.length == 0) {
        pregunta_Creada = await this.transaccionService.transaction(Tipo_Transaccion.Guardar, Pregunta, pregunta);
        if (pregunta_Creada == "Error") {
          return {
            status: 400,
            message: Errores_Preguntas.PREGUNTA_NO_CREADA
          };
        } else {
          preguntas_Creadas.push(pregunta_Creada.resultado.pregunta_Id);
        }
      } else {
        pregunta_Creada = await this.transaccionService.transaction(Tipo_Transaccion.Actualizar, Pregunta, pregunta, '', buscar_pregunta[0].pregunta_Id);

        if (pregunta_Creada == "Error") {
        } else {
          preguntas_Creadas.push(pregunta_Creada.resultado.pregunta_ID);
        }
      }
    }
    return preguntas_Creadas;
  }

  async findAll() {

    let test: any = await this.testRepository.find();

    for (let i = 0; i < test.length; i++) {

      for (let j = 0; j < test[i].dimensiones_ID.length; j++) {
        let dimensiones = await this.buscarDimensiones(test[i].dimensiones_ID[j]);
        test[i].dimensiones_ID[j] = dimensiones[0];

        console.log(test[i]);
        let preguntas = await this.buscarPreguntas(test[i].dimensiones_ID[j]);
        test[i].dimensiones_ID[j].preguntas_ID = preguntas;
      }

    }

    return test;

  }

  async findByNameTest(name: string) {
    let test: any = await this.transaccionService.transaction(Tipo_Transaccion.Consultar_Con_Parametros, Test, '', 'test_Titulo', name);
    if (test == "Error") {
      return Errores_Dimension.ERROR_BUSCAR_DIMENSION;
    } else {

      for (let j = 0; j < test[0].dimensiones_ID.length; j++) {
        let dimensiones = await this.buscarDimensiones(test[0].dimensiones_ID[j]);
        test[0].dimensiones_ID[j] = dimensiones[0];

        let preguntas = await this.buscarPreguntas(test[0].dimensiones_ID[j]);
        test[0].dimensiones_ID[j].preguntas_ID = preguntas;
      }
    }

    return test[0];
  }

  async findByNameDimension(name: string) {
    let dimension: any = await this.transaccionService.transaction(Tipo_Transaccion.Consultar_Con_Parametros, Dimension, '', 'dimension_Titulo', name);
    if (dimension == "Error") {
      return Errores_Dimension.ERROR_BUSCAR_DIMENSION;
    } else {
      let preguntas = await this.buscarPreguntas(dimension[0]);
      dimension[0].preguntas = preguntas;
    }

    return dimension[0];
  }

  async buscarDimensiones(dimensiones: any) {

    let dimensiones_Creadas = [];

    let dimension: any = await this.transaccionService.transaction(Tipo_Transaccion.Consultar_Con_Parametros, Dimension, '', 'dimension_Id', dimensiones)
    console.log(dimension);
    if (dimension == "Error") {
      return Errores_Dimension.ERROR_BUSCAR_DIMENSION;
    } else {
      console.log(dimension);
      dimensiones_Creadas.push(dimension[0]);
    }

    return dimensiones_Creadas;
  }

  async buscarPreguntas(dimension: any) {

    let preguntas_Creadas = [];
    console.log(dimension);
    for (let i = 0; i < dimension.preguntas_ID.length; i++) {
      let pregunta: any = await this.transaccionService.transaction(Tipo_Transaccion.Consultar_Con_Parametros, Pregunta, '', 'pregunta_Id', dimension.preguntas_ID[i])
      if (pregunta == "Error") {
        return Errores_Preguntas.PREGUNTA_NO_ENCONTRADA;
      } else {
        preguntas_Creadas.push(pregunta);
      }
    }

    return preguntas_Creadas;

  }

  findOne(id: number) {
    return `This action returns a #${id} test`;
  }

  update(id: number, updateTestDto: UpdateFormulariotDto) {
    return `This action updates a #${id} test`;
  }

  async remove(id: number) {
    const test_ID = id.toString();
    let test_Buscado = await this.transaccionService.transaction(Tipo_Transaccion.Consultar_Con_Parametros, Test, '', 'test_Id', test_ID);

    if (test_Buscado == "Error") {
      return Errores_Test.TEST_NO_ENCONTRADO;
    } else {
      let test_Eliminar = await this.transaccionService.transaction(Tipo_Transaccion.Actualizar_Con_Parametros, Test, PREGUNTAS_ESTADO.ELIMINADO, 'test_Id', test_ID);

      if (test_Eliminar == "Error") {
        return Errores_Test.TEST_NO_ELIMINADO;
      } else {
        return Exito_Test.TEST_ELIMINADO;
      }
    }
  }
}
