import { User_Interface } from './../common/interfaces/user.interface';
import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Connection, Repository, getConnection } from 'typeorm';

import { TransaccionService } from 'src/common/transaction/transaccion.service';
import { Tipo_Transaccion } from 'src/common/enums/tipo_Transaccion.enum';

import { Test } from 'src/resource/test/entities/test.entity';
import { Pregunta } from 'src/resource/pregunta/entities/pregunta.entity';
import { Dimension } from 'src/resource/dimension/entities/dimension.entity';
import { ProyectoUsuario } from 'src/resource/proyecto_usuario/entities/proyecto_usuario.entity';
import { Usuario } from 'src/resource/usuario/entities/usuario.entity';
import { validateUser } from 'src/auth/guard/validateRole.guard';
import { crear_Objeto_Dimension, crear_Objeto_Formulario, crear_Objeto_Pregunta, crear_Objeto_Test } from './method/Objects.methotd';
import { PreguntaProyecto } from 'src/resource/pregunta_proyecto/entities/pregunta_proyecto.entity';
import { Errores_Preguntas } from 'src/common/helpers/preguntas.helpers';
import { TestProyecto } from 'src/resource/test_proyecto/entities/test_proyecto.entity';
import { DimensionProyecto } from 'src/resource/dimension_proyecto/entities/dimension_proyecto.entity';
import { Errores_Dimension } from 'src/common/helpers/dimension.helpers';
import { Errores_Test } from 'src/common/helpers/test.helpers';
import { Cuenta } from 'src/resource/cuenta/entities/cuenta.entity';


@Injectable()
export class ClientService {

  constructor(
    @InjectRepository(ProyectoUsuario)
    private proyectoUsuarioRepository: Repository<ProyectoUsuario>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(TestProyecto)
    private testRepository: Repository<TestProyecto>,
    @InjectRepository(PreguntaProyecto)
    private preguntaRepository: Repository<PreguntaProyecto>,
    @InjectRepository(DimensionProyecto)
    private dimensionRepository: Repository<DimensionProyecto>,
    private transaccionService: TransaccionService,
  ) { }

  async create(createClientDto: any, user: User_Interface) {

    const validacion = validateUser(user);

    if (!validacion) { return { status: 400, message: validacion } }

    const objeto_Proyecto = crear_Objeto_Formulario(createClientDto);

    for (let i = 0; i < objeto_Proyecto.test_ID.length; i++) {
      for (let j = 0; j < objeto_Proyecto.test_ID[i].dimension.length; j++) {
        let preguntas_Registradas = await this.guardar_Preguntas(objeto_Proyecto.test_ID[i].dimension[j].preguntas);
        if (preguntas_Registradas.status == 201) {
          objeto_Proyecto.test_ID[i].dimension[j].preguntas = preguntas_Registradas.message;
        } else {
          return {
            status: 400,
            message: preguntas_Registradas.message
          }
        }
      }
    }

    for (let i = 0; i < objeto_Proyecto.test_ID.length; i++) {
      let dimensiones_Registradas = await this.guardar_Dimensiones(objeto_Proyecto.test_ID[i].dimension);
      if (dimensiones_Registradas.status == 201) {
        objeto_Proyecto.test_ID[i].dimension = dimensiones_Registradas.message;
      } else {
        return {
          status: 400,
          message: dimensiones_Registradas.message
        }
      }
    }

    let test_Registrados = await this.guardar_Test(objeto_Proyecto.test_ID);

    if (test_Registrados.status == 201) {
      objeto_Proyecto.test_ID = test_Registrados.message;
    } else {
      return {
        status: 400,
        message: test_Registrados.message
      }
    }

    let Proyecto_Creado = await this.guardar_Proyectos(objeto_Proyecto, user);

    if (Proyecto_Creado.status == 201) {
      return {
        status: 201,
        message: Proyecto_Creado.message
      }
    } else {
      return {
        status: 400,
        message: Proyecto_Creado.message
      }
    }

  }

  async guardar_Proyectos(proyecto: any, user: User_Interface) {

    const usuario_Buscar = await this.buscar_Usuario(user);
    let proyecto_Buscar: any = await this.transaccionService.transaction(Tipo_Transaccion.Consultar_Con_Parametros, ProyectoUsuario, '', 'proyecto_Titulo', proyecto.proyecto_Titulo);
    let proyecto_Creado: any = {};
    let bandera: Boolean = false;
    let proyectos_ID: any = [];

    if (proyecto_Buscar.length == 0) {
      proyecto_Creado = await this.transaccionService.transaction(Tipo_Transaccion.Guardar, ProyectoUsuario, proyecto);
      if (proyecto_Creado == "Error") {
        bandera = true;
      } else {
        proyectos_ID.push(proyecto_Creado.resultado.proyecto_Id.toString());
      }

    } else {
      proyecto_Creado = await this.transaccionService.transaction(Tipo_Transaccion.Actualizar, ProyectoUsuario, proyecto, '', proyecto_Buscar[0].proyecto_Id);
      if (proyecto_Creado == "Error") {
        bandera = true;
      } else {
        proyectos_ID.push(proyecto_Buscar[0].proyecto_Id.toString());
      }
    }

    if (bandera == false) {

      let proyectos_Usuario: any = []

      if (usuario_Buscar.proyectos_Id != null) {
        for (let i = 0; i < usuario_Buscar.proyectos_Id.length; i++) {
          proyectos_Usuario.push(usuario_Buscar.proyectos_Id[i].toString());
        }
      }

      let nuevo_Arreglo = proyectos_ID.concat(proyectos_Usuario);

      let Arreglo_Unico = Array.from(new Set(nuevo_Arreglo));

      usuario_Buscar.proyectos_Id = Arreglo_Unico;

      await this.transaccionService.transaction(Tipo_Transaccion.Actualizar, Usuario, usuario_Buscar, '', usuario_Buscar.usuario_Id)
      return {
        status: 201,
        message: "Proyecto creado"
      }
    } else {
      return {
        status: 400,
        message: "Error al crear proyecto"
      }
    }
  }

  async guardar_Test(test_Objetos: any) {

    let test_Creados_ID = [];
    let test_Creado: any;
    let bandera: Boolean = false;

    for (let i = 0; i < test_Objetos.length; i++) {
      const buscar_Test: any = await this.transaccionService.transaction(Tipo_Transaccion.Consultar_Con_Parametros, TestProyecto, '', 'test_Titulo', test_Objetos[i].titulo);
      const objeto_Test: any = crear_Objeto_Test(test_Objetos[i].titulo, test_Objetos[i].descripcion, test_Objetos[i].autor, test_Objetos[i].bibliografia, test_Objetos[i].dimension);

      if (buscar_Test.length == 0) {

        test_Creado = await this.transaccionService.transaction(Tipo_Transaccion.Guardar, TestProyecto, objeto_Test);

        if (test_Creado == "Error") {
          bandera = true;
        } else {
          test_Creados_ID.push(test_Creado.resultado.test_Titulo);
        }

      } else {

        test_Creado = await this.transaccionService.transaction(Tipo_Transaccion.Actualizar, TestProyecto, objeto_Test, '', buscar_Test[0].test_Id);

        if (test_Creado == "Error") {
          bandera = true;
        } else {
          test_Creados_ID.push(buscar_Test[0].test_Id)
        }

      }
    }

    if (bandera == false) {
      return { status: 201, message: test_Creados_ID }
    } else {
      await this.eliminar_Test(test_Creados_ID);
      return { status: 400, message: Errores_Test.TEST_NO_CREADO }
    }
  }

  async guardar_Dimensiones(dimensiones_Objetos: any) {

    let dimensiones_Creadas_ID = [];

    let dimension_Creada: any;
    let bandera: Boolean = false;

    for (let i = 0; i < dimensiones_Objetos.length; i++) {
      const buscar_Dimension: any = await this.transaccionService.transaction(Tipo_Transaccion.Consultar_Con_Parametros, DimensionProyecto, '', 'dimension_proyecto_Titulo', dimensiones_Objetos[i].dimension_titulo);
      const objeto_Dimension: any = crear_Objeto_Dimension(dimensiones_Objetos[i].dimension_titulo, dimensiones_Objetos[i].dimension_descripcion, dimensiones_Objetos[i].preguntas);
      if (buscar_Dimension.length == 0) {

        dimension_Creada = await this.transaccionService.transaction(Tipo_Transaccion.Guardar, DimensionProyecto, objeto_Dimension);
        if (dimension_Creada == "Error") {
          bandera = true;
        } else {
          dimensiones_Creadas_ID.push(dimension_Creada.resultado.dimension_proyecto_Id)
        }

      } else {

        dimension_Creada = await this.transaccionService.transaction(Tipo_Transaccion.Actualizar, DimensionProyecto, objeto_Dimension, '', buscar_Dimension[0].dimension_proyecto_Id);
        if (dimension_Creada == "Error") {
          bandera = true;
        } else {
          dimensiones_Creadas_ID.push(buscar_Dimension[0].dimension_proyecto_Id);
        }

      }

    }

    if (bandera == false) {
      return { status: 201, message: dimensiones_Creadas_ID }
    } else {
      await this.eliminar_Dimensiones(dimensiones_Creadas_ID);
      return { status: 400, message: Errores_Dimension.ERROR_CREAR_DIMENSION }
    }

  }

  async guardar_Preguntas(preguntas_Objetos: any) {

    let preguntas_ID = [];
    let preguntas_Creadas_ID = [];
    let pregunta_Creada: any;
    let bandera: Boolean = false;

    for (let i = 0; i < preguntas_Objetos.length; i++) {

      let buscar_preguntas: any = await this.transaccionService.transaction(Tipo_Transaccion.Consultar_Con_Parametros, PreguntaProyecto, '', 'pregunta_Titulo', preguntas_Objetos[i].Titulo);
      const objeto_Pregunta = crear_Objeto_Pregunta(preguntas_Objetos[i].Titulo, preguntas_Objetos[i].Tipo, preguntas_Objetos[i].Opciones);

      if (buscar_preguntas.length == 0) {
        pregunta_Creada = await this.transaccionService.transaction(Tipo_Transaccion.Guardar, PreguntaProyecto, objeto_Pregunta);
        if (pregunta_Creada == "Error") {
          bandera = true;
        } else {
          preguntas_ID.push(pregunta_Creada.resultado.pregunta_ID);
          preguntas_Creadas_ID.push(pregunta_Creada.resultado.pregunta_ID);
        }

      } else {

        pregunta_Creada = await this.transaccionService.transaction(Tipo_Transaccion.Actualizar, PreguntaProyecto, objeto_Pregunta, '', buscar_preguntas[0].pregunta_Id);
        if (pregunta_Creada == "Error") {
          bandera = true;
        } else {
          preguntas_ID.push(buscar_preguntas[0].pregunta_Id);
          preguntas_Creadas_ID.push(buscar_preguntas[0].pregunta_Id);
        }

      }
    }

    if (bandera == false) {
      return { status: 201, message: preguntas_ID }
    } else {
      await this.eliminar_Preguntas(preguntas_Creadas_ID);
      preguntas_ID = [];
      preguntas_Creadas_ID = []
      return { status: 400, message: Errores_Preguntas.PREGUNTA_NO_CREADA }
    }
  }

  async eliminar_Preguntas(preguntas: any): Promise<void> {
    for (let i = 0; i < preguntas.length; i++) {
      await this.transaccionService.transaction(Tipo_Transaccion.Eliminar_Con_Parametros, PreguntaProyecto, '', "pregunta_Id", preguntas[i])
    }
  }

  async eliminar_Dimensiones(dimensiones: any): Promise<void> {
    for (let i = 0; i < dimensiones.length; i++) {
      await this.transaccionService.transaction(Tipo_Transaccion.Eliminar_Con_Parametros, DimensionProyecto, '', "dimension_proyecto_Id", dimensiones[i])
    }
  }

  async eliminar_Test(test: any): Promise<void> {
    for (let i = 0; i < test.length; i++) {
      await this.transaccionService.transaction(Tipo_Transaccion.Eliminar_Con_Parametros, TestProyecto, '', "dimension_proyecto_Id", test[i])
    }
  }

  async buscar_Usuario(usuario: User_Interface) {

    const buscar_Cuenta: any = await this.transaccionService.transaction(Tipo_Transaccion.Consultar_Con_Parametros, Cuenta, '', 'cuenta_Correo_Electronico', usuario.identificador)

    const buscar_Usuario: any = await this.transaccionService.transaction(Tipo_Transaccion.Consultar_Con_Parametros, Usuario, '', 'usuario_Id', buscar_Cuenta[0].usuario_Id.usuario_Id)

    return buscar_Usuario[0];
  }

  async findAll() {
    let proyectos: any = await this.transaccionService.transaction(Tipo_Transaccion.Consultar, ProyectoUsuario, '');

    return proyectos;
  }

  async findOne(user: User_Interface) {
    let proyectos: any = await this.transaccionService.transaction(Tipo_Transaccion.Consultar_Con_Parametros, ProyectoUsuario, '');

    for (let i = 0; i < proyectos.length; i++) {
      for (let j = 0; j < proyectos[i].test_ID.length; j++) {
        let test = await this.buscarTests(proyectos[i].test_ID[j]);
        proyectos[i].test_ID[j] = test;
      }
      console.log(proyectos[i].test_ID)
    }
  }

  async buscarTests(tests: any) {

    let tests_Creados = [];

    let test: any = await this.transaccionService.transaction(Tipo_Transaccion.Consultar_Con_Parametros, TestProyecto, '', 'test_Id', tests)

    if (test == "Error") {
      return Errores_Test.TEST_NO_ENCONTRADO;
    } else {
      tests_Creados.push(test[0]);
    }
    return tests_Creados;
  }

  async buscarDimensiones(dimensiones: any) {

    let dimensiones_Creadas = [];

    let dimension: any = await this.transaccionService.transaction(Tipo_Transaccion.Consultar_Con_Parametros, DimensionProyecto, '', 'dimension_Id', dimensiones)
    if (dimension == "Error") {
      return Errores_Dimension.ERROR_BUSCAR_DIMENSION;
    } else {
      dimensiones_Creadas.push(dimension[0]);
    }

    return dimensiones_Creadas;
  }

  async buscarPreguntas(dimension: any) {

    let preguntas_Creadas = [];

    for (let i = 0; i < dimension.preguntas_ID.length; i++) {
      let pregunta: any = await this.transaccionService.transaction(Tipo_Transaccion.Consultar_Con_Parametros, PreguntaProyecto, '', 'pregunta_Id', dimension.preguntas_ID[i])
      if (pregunta == "Error") {
        return Errores_Preguntas.PREGUNTA_NO_ENCONTRADA;
      } else {
        preguntas_Creadas.push(pregunta);
      }
    }

    return preguntas_Creadas;

  }

  update(id: number, updateClientDto: any) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
