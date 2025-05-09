import Campos from "../entities/Campos"
import { AppDataSource } from "../../database/data-source"

const repository = AppDataSource.getRepository(Campos);

export default {
    async createCampo(data: { name: string; dataType: "string" | "number" | "boolean" | "date" }) {
        const existing = await repository.findOneBy({ name: data.name });

        if (existing) {
            throw new Error("Já existe um campo com este nome");
        }

        const novoCampo = repository.create({
            name: data.name,
            dataType: data.dataType,
        });

        await repository.save(novoCampo);

        return novoCampo;
    },

    async getCampos() {
        return await repository.find();
    }
};
