import "reflect-metadata"

import cors from "cors"
import express from "express"

import routes from "./app/routes/routes"
import { AppDataSource } from "./database/data-source"

const app = express();

app.use(cors());
app.use(routes);
app.use(express.json());

AppDataSource.initialize().then(async () => {
    console.log("Database ok");
    app.listen(3333, () => {
        console.log("Server started on port 3333");
    })
})