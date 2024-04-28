import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientService } from './client.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Roles } from 'src/common/enums/roles.enum';
import { ActiveUser } from 'src/common/decorators/user.decorator';
import { User_Interface } from 'src/common/interfaces/user.interface';

@Auth(Roles.USUARIO)
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Body() createClientDto: any, @ActiveUser() user: User_Interface) {
    return this.clientService.create(createClientDto, user);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get('obtenerProyectos')
  findOne(@ActiveUser() usuario: User_Interface) {
    return this.clientService.findOne(usuario);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: any) {
    return this.clientService.update(+id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
