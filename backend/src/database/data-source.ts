import "reflect-metadata"
import { DataSource } from "typeorm"

import { CreateCamposTable1746760232362 } from "./migrations/1746760232362-createCamposTable"
import { CreatePreenchimentosTable1700000000002 } from "./migrations/1746760250463-createPreenchimentosTable"

import Campos from "../app/entities/Campos"
import Preenchimento from "../app/entities/Preenchimento"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "teste_tecnico_fullstack_BS",
    synchronize: false,
    logging: false,
    entities: [Campos, Preenchimento],
    migrations: [CreateCamposTable1746760232362, CreatePreenchimentosTable1700000000002],
    subscribers: [],
})