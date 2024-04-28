import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DimensionProyectoService } from './dimension_proyecto.service';
import { CreateDimensionProyectoDto } from './dto/create-dimension_proyecto.dto';
import { UpdateDimensionProyectoDto } from './dto/update-dimension_proyecto.dto';

@Controller('dimension-proyecto')
export class DimensionProyectoController {
  constructor(private readonly dimensionProyectoService: DimensionProyectoService) {}

  @Post()
  create(@Body() createDimensionProyectoDto: CreateDimensionProyectoDto) {
    return this.dimensionProyectoService.create(createDimensionProyectoDto);
  }

  @Get()
  findAll() {
    return this.dimensionProyectoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dimensionProyectoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDimensionProyectoDto: UpdateDimensionProyectoDto) {
    return this.dimensionProyectoService.update(+id, updateDimensionProyectoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dimensionProyectoService.remove(+id);
  }
}
