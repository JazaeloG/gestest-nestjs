import { Pregunta } from "src/resource/pregunta/entities/pregunta.entity";

import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
    JoinColumn,
} from "typeorm";

import { PREGUNTAS_ESTADO } from "src/common/enums/preguntas.enum";
import { Respuesta } from "src/resource/respuesta/entities/respuesta.entity";

@Entity()
export class DimensionProyecto {

    @PrimaryGeneratedColumn()
    dimension_proyecto_Id: number;

    @Column({ nullable: false})
    dimension_proyecto_Titulo: string;

    @Column({ nullable: false})
    dimension_proyecto_Descripcion: string;

    @Column({ nullable: false, default: PREGUNTAS_ESTADO.ACTIVO, enum: PREGUNTAS_ESTADO, type: 'enum'})
    dimension_proyecto_Estado: string;

    @Column("text", { array: true, nullable: true })
    preguntas_ID: Pregunta[];

    @Column("text", { array: true, nullable: true })
    respuestas_ID: Respuesta[];

}
