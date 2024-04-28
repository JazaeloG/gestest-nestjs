import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CuentaService } from './cuenta.service';
import { CreateCuentaDto } from './dto/create-cuenta.dto';
import { UpdateCuentaDto } from './dto/update-cuenta.dto';

@Controller('cuenta')
export class CuentaController {
  constructor(private readonly cuentaService: CuentaService) {}

  @Post()
  create(@Body() createCuentaDto: CreateCuentaDto) {
    return this.cuentaService.create(createCuentaDto);
  }

  @Get()
  findAll() {
    return this.cuentaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cuentaService.findOne(+id);
  }

  @Get('buscarPorCorreo/:correo')
  findOneByEmail(@Param('correo') correo: string) {
    return this.cuentaService.findOneByEmail(correo);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCuentaDto: UpdateCuentaDto) {
    return this.cuentaService.update(+id, updateCuentaDto);
  }

  @Patch('actualizarContrasena/:identificador')
  actualizarContraseña(@Param('identificador') identificador: string, @Body() Datos: any) {
    return this.cuentaService.actualizarContrasena(identificador, Datos.contraseña );
  }

  @Delete('eliminarCuenta/:identificador')
  eliminarCuenta(@Param('identificador') identificador: string) {
    return this.cuentaService.EliminarCuenta(identificador);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cuentaService.remove(+id);
  }
}
