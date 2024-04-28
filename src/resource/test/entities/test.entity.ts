import { Dimension } from 'src/resource/dimension/entities/dimension.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    ManyToOne,
    OneToMany
} from 'typeorm';

@Entity()
export class Test {

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
    dimensiones_ID: Dimension[]

}
