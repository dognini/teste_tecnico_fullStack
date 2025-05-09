import { AppDataSource } from "../../database/data-source"

import Campos from "../entities/Campos"
import Preenchimento from "../entities/Preenchimento"

const repository = AppDataSource.getRepository(Preenchimento);
const camposRepository = AppDataSource.getRepository(Campos);

export default {
    async createPreenchimento(data: { fieldId: number; value: any }) {
        const campo = await camposRepository.findOneBy({ id: data.fieldId });

        if (!campo) {
            throw new Error("Campo não encontrado");
        }

        const value = data.value;

        switch (campo.dataType) {
            case "number":
                if (isNaN(Number(value))) {
                    throw new Error("Valor inválido para tipo number");
                };
                break;
            case "boolean":
                if (value !== "true" && value !== "false" && value !== true && value !== false) {
                    throw new Error("Valor inválido para tipo boolean");
                };
                break;
            case "date":
                if (isNaN(Date.parse(value))) {
                    throw new Error("Valor inválido para tipo date");
                };
                break;
        }

        const preenchimento = repository.create({
            fieldId: data.fieldId,
            value: value.toString(),
        });

        await repository.save(preenchimento);

        return preenchimento;
    },

    async getPreenchimentos() {
        return await repository.find();
    }
};
