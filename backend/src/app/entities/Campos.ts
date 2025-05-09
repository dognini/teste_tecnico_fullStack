import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from "typeorm"

import Preenchimento from "./Preenchimento"

@Entity("campos")
class Campos {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: "varchar", length: 300, nullable: false })
    name: string;

    @Column({ type: "enum", enum: ["string", "number", "boolean", "date"], nullable: false })
    dataType: "string" | "number" | "boolean" | "date";

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @OneToMany(() => Preenchimento, preenchimento => preenchimento.campo)
    preenchimentos: Preenchimento[];
};

export default Campos;