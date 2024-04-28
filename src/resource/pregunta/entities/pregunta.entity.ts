import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    ManyToOne,
    OneToMany
} from 'typeorm';

import { PREGUNTAS_ESTADO } from 'src/common/enums/preguntas.enum';

import { Pregunta_Tipos } from 'src/common/enums/pregunta_Tipos.enum';
import { Dimension } from 'src/resource/dimension/entities/dimension.entity';

@Entity()
export class Pregunta {

    @PrimaryGeneratedColumn()
    pregunta_Id: number;

    @Column({ nullable: false})
    pregunta_Titulo: string;

    @Column({ nullable: false, type: 'enum', enum: Pregunta_Tipos})
    pregunta_Tipo: string;

    @Column({ nullable: false})
    pregunta_Respuesta: string;

    @Column({ nullable: true, type: 'enum', enum: PREGUNTAS_ESTADO, default: PREGUNTAS_ESTADO.ACTIVO})
    pregunta_Estado: string;

}
