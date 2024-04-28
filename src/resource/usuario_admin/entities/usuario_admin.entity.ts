import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UsuarioAdmin {
    @PrimaryGeneratedColumn()
    usuario_Id: number;

    @Column({nullable: false})
    usuario_Nombre: string;

    @Column({nullable: false})
    usuario_Apellido: string;

}
