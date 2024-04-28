import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProyectoUsuarioService } from './proyecto_usuario.service';
import { CreateProyectoUsuarioDto } from './dto/create-proyecto_usuario.dto';
import { UpdateProyectoUsuarioDto } from './dto/update-proyecto_usuario.dto';

@Controller('proyecto-usuario')
export class ProyectoUsuarioController {
  constructor(private readonly proyectoUsuarioService: ProyectoUsuarioService) {}

  @Post()
  create(@Body() createProyectoUsuarioDto: CreateProyectoUsuarioDto) {
    return this.proyectoUsuarioService.create(createProyectoUsuarioDto);
  }

  @Get()
  findAll() {
    return this.proyectoUsuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proyectoUsuarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProyectoUsuarioDto: UpdateProyectoUsuarioDto) {
    return this.proyectoUsuarioService.update(+id, updateProyectoUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proyectoUsuarioService.remove(+id);
  }
}
