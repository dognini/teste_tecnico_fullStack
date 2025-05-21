import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

import { CampoDataType } from "../interfaces/ICampos"

@Entity()
export class Campos {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    name: string

    @Column({
        type: "enum",
        enum: CampoDataType,
        enumName: "campo_data_type"
    })
    datatype: CampoDataType;


    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}