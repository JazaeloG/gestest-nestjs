import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { Test } from 'src/resource/test/entities/test.entity';
import { Proyectos_Estado } from 'src/common/enums/proyectos.enum';
import { Usuario } from 'src/resource/usuario/entities/usuario.entity';

@Entity()
export class ProyectoUsuario {

    @PrimaryGeneratedColumn()
    proyecto_Id: number;

    @Column({ nullable: false})
    proyecto_Titulo: string;

    @Column({ nullable: false})
    proyecto_Descripcion: string;

    @Column({ nullable: false, default: Proyectos_Estado.ACTIVO, enum: Proyectos_Estado, type: 'enum'})
    proyecto_Status: string;

    @Column({ nullable: false})
    proyecto_VariableDependiente: string;

    @Column({ nullable: false})
    proyecto_VariableIndependiente: string;

    @Column({ nullable: false})
    proyecto_preguntaInvestigacion: string;

    @Column({ nullable: false})
    proyecto_hipotesis: string;

    @Column("text", { array: true, nullable: true })
    test_ID: Test[]

}
