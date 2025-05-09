import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm"

import Campos from "./Campos"

@Entity("preenchimentos")
class Preenchimento {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: "int", nullable: false })
    fieldId: number;

    @ManyToOne(() => Campos, campo => campo.preenchimentos, { onDelete: "CASCADE" })
    @JoinColumn({ name: "fieldId" })
    campo: Campos;

    @Column({ type: "text", nullable: false, charset: "utf8mb4" })
    value: string | number | boolean | Date;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;
};

export default Preenchimento;