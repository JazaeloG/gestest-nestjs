import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PreguntaProyectoService } from './pregunta_proyecto.service';
import { CreatePreguntaProyectoDto } from './dto/create-pregunta_proyecto.dto';
import { UpdatePreguntaProyectoDto } from './dto/update-pregunta_proyecto.dto';

@Controller('pregunta-proyecto')
export class PreguntaProyectoController {
  constructor(private readonly preguntaProyectoService: PreguntaProyectoService) {}

  @Post()
  create(@Body() createPreguntaProyectoDto: CreatePreguntaProyectoDto) {
    return this.preguntaProyectoService.create(createPreguntaProyectoDto);
  }

  @Get()
  findAll() {
    return this.preguntaProyectoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preguntaProyectoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePreguntaProyectoDto: UpdatePreguntaProyectoDto) {
    return this.preguntaProyectoService.update(+id, updatePreguntaProyectoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.preguntaProyectoService.remove(+id);
  }
}
