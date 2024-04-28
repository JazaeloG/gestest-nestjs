import { Injectable } from '@nestjs/common';
import { CreateTestProyectoDto } from './dto/create-test_proyecto.dto';
import { UpdateTestProyectoDto } from './dto/update-test_proyecto.dto';

@Injectable()
export class TestProyectoService {
  create(createTestProyectoDto: CreateTestProyectoDto) {
    return 'This action adds a new testProyecto';
  }

  findAll() {
    return `This action returns all testProyecto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testProyecto`;
  }

  update(id: number, updateTestProyectoDto: UpdateTestProyectoDto) {
    return `This action updates a #${id} testProyecto`;
  }

  remove(id: number) {
    return `This action removes a #${id} testProyecto`;
  }
}
