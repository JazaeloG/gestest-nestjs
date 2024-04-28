import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn
} from 'typeorm';

import { 
    Roles
} from 'src/common/enums/roles.enum';

import { CUENTAS_ESTADO } from 'src/common/enums/cuentas.enum';
import { Usuario } from 'src/resource/usuario/entities/usuario.entity';

@Entity()
export class Cuenta {

    @PrimaryGeneratedColumn()
    cuenta_Id: number;

    @Column({ nullable: false, unique: true})
    cuenta_Usuario_Nombre: string;

    @Column({ unique: true, nullable: false})
    cuenta_Correo_Electronico: string;

    @Column({ nullable: false})
    cuenta_Contrasena: string;

    @Column({ nullable: false, type: 'enum', enum: Roles})
    cuenta_Rol: string;

    @Column({ nullable: true, type: 'enum', enum: CUENTAS_ESTADO, default: CUENTAS_ESTADO.ACTIVO})
    cuenta_Estado: string;

    @Column()
    cuenta_Fecha_Creacion: string;

    @Column({ nullable: false})
    @OneToOne(() => Usuario, { eager: true })
    @JoinColumn({ name: 'usuario_Id' })
    usuario_Id: Usuario;
}
