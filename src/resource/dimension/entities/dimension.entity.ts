import { Pregunta } from 'src/resource/pregunta/entities/pregunta.entity';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
    JoinColumn,
    } from 'typeorm';

import { PREGUNTAS_ESTADO } from 'src/common/enums/preguntas.enum';
import { Test } from 'src/resource/test/entities/test.entity';

@Entity()
export class Dimension {

    @PrimaryGeneratedColumn()
    dimension_Id: number;

    @Column({ nullable: false})
    dimension_Titulo: string;

    @Column({ nullable: false})
    dimension_Descripcion: string;

    @Column({ nullable: false, default: PREGUNTAS_ESTADO.ACTIVO, enum: PREGUNTAS_ESTADO, type: 'enum'})
    dimension_Estado: string;

    @Column("text", { array: true, nullable: true })
    preguntas_ID: Pregunta[];
}
