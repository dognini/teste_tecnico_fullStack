import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"

import { Campos } from "./Campos"

@Entity()
export class Preenchimento {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Campos, campo => campo.id)
    fieldId: string

    @Column('simple-json')
    value: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
}