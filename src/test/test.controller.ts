import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateFormularioDto } from './dto/create-test.dto';
import { UpdateFormulariotDto } from './dto/update-test.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Roles } from 'src/common/enums/roles.enum';
import { ActiveUser } from 'src/common/decorators/user.decorator';
import { User_Interface } from 'src/common/interfaces/user.interface';

@Auth(Roles.ADMIN)
@Controller('formulario')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  create(@Body() createTestDto: any, @ActiveUser() user: User_Interface) {
    return this.testService.create(createTestDto, user);
  }

  @Get()
  findAll() {
    return this.testService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testService.findOne(+id);
  }

  @Post('buscarTest')
  findByNameTest(@Body() nombre: any) {
    return this.testService.findByNameTest(nombre.nombre);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestDto: UpdateFormulariotDto) {
    return this.testService.update(+id, updateTestDto);
  }

  @Patch('actualizarTest/:id')
  modificar_Test(@Param('id') id: string, @Body() updateTestDto: any) {
    return this.testService.modificar_Test(updateTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testService.remove(+id);
  }
}
