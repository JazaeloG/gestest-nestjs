import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Respuesta {

    @PrimaryGeneratedColumn()
    respuesta_Id: number;

    @Column({ nullable: false})
    respuesta_Valor: string;

}
