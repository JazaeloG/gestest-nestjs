import { ProyectoUsuario } from 'src/resource/proyecto_usuario/entities/proyecto_usuario.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm';

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    usuario_Id: number;

    @Column({nullable: false})
    usuario_Nombre: string;

    @Column({nullable: false})
    usuario_Apellido: string;

    @Column({nullable: true})
    usuario_Institucion: string;

    @Column("text", { array: true, nullable: true })
    proyectos_Id: ProyectoUsuario[]

}
