import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CuentaAdminService } from './cuenta_admin.service';
import { CreateCuentaAdminDto } from './dto/create-cuenta_admin.dto';
import { UpdateCuentaAdminDto } from './dto/update-cuenta_admin.dto';

@Controller('cuenta-admin')
export class CuentaAdminController {
  constructor(private readonly cuentaAdminService: CuentaAdminService) {}

  @Post()
  create(@Body() createCuentaAdminDto: CreateCuentaAdminDto) {
    return this.cuentaAdminService.create(createCuentaAdminDto);
  }

  @Get()
  findAll() {
    return this.cuentaAdminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cuentaAdminService.findOne(+id);
  }

  @Get('buscarPorCorreo/:correo')
  findOneByEmail(@Param('correo') correo: string) {
    return this.cuentaAdminService.findOneByEmail(correo);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCuentaAdminDto: UpdateCuentaAdminDto) {
    return this.cuentaAdminService.update(+id, updateCuentaAdminDto);
  }

  @Patch('actualizarContrasena/:identificador')
  actualizarContraseña(@Param('identificador') identificador: string, @Body() Datos: any) {
    return this.cuentaAdminService.actualizarContrasena(identificador, Datos.contraseña );
  }

  @Delete('eliminarCuenta/:identificador')
  eliminarCuenta(@Param('identificador') identificador: string) {
    return this.cuentaAdminService.EliminarCuenta(identificador);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cuentaAdminService.remove(+id);
  }
}
