import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestProyectoService } from './test_proyecto.service';
import { CreateTestProyectoDto } from './dto/create-test_proyecto.dto';
import { UpdateTestProyectoDto } from './dto/update-test_proyecto.dto';

@Controller('test-proyecto')
export class TestProyectoController {
  constructor(private readonly testProyectoService: TestProyectoService) {}

  @Post()
  create(@Body() createTestProyectoDto: CreateTestProyectoDto) {
    return this.testProyectoService.create(createTestProyectoDto);
  }

  @Get()
  findAll() {
    return this.testProyectoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testProyectoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestProyectoDto: UpdateTestProyectoDto) {
    return this.testProyectoService.update(+id, updateTestProyectoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testProyectoService.remove(+id);
  }
}
