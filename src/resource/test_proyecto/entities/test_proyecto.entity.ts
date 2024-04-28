import { DimensionProyecto } from 'src/resource/dimension_proyecto/entities/dimension_proyecto.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TestProyecto {

    @PrimaryGeneratedColumn()
    test_Id: number;

    @Column({ nullable: false})
    test_Titulo: string;

    @Column({ nullable: false})
    test_Descripcion: string;

    @Column({ nullable: false})
    test_Autor: string;

    @Column({ nullable: false})
    test_Bibliografia: string;

    @Column("text", { array: true, nullable: true })
    dimensiones_ID: DimensionProyecto[]

}
