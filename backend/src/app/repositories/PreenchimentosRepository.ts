import Campos from "../entities/Campos"
import Preenchimento from "../entities/Preenchimento"

import { AppDataSource } from "../../database/data-source"

import IPreenchimentos from "../interfaces/IPreenchimentos"

export default {
    async createPreenchimento(data: { fieldId: number; value: any }): Promise<IPreenchimentos> {
        const campoRepo = AppDataSource.getRepository(Campos);
        const preenchimentoRepo = AppDataSource.getRepository(Preenchimento);

        const campo = await campoRepo.findOne({ 
            where: { id: data.fieldId } 
        });

        if (!campo) {
            throw new Error("Campo não encontrado.");
        }

        let validatedValue: any;
        try {

            switch (campo.dataType) {
                case 'number':
                    validatedValue = Number(data.value);
                    if (isNaN(validatedValue)) throw new Error("Valor inválido para tipo number.");
                    break;
                case 'boolean':
                    validatedValue = String(data.value).toLowerCase() === 'true';
                    if (data.value !== 'true' && data.value !== 'false') {
                        throw new Error("Valor inválido para tipo boolean.");
                    }
                    break;
                case 'date':
                    validatedValue = new Date(data.value);
                    if (isNaN(validatedValue.getTime())) throw new Error("Valor inválido para tipo date.");
                    break;
                default:
                    validatedValue = String(data.value);
            };

        } catch (error) {
            throw error;
        };

        const preenchimento = preenchimentoRepo.create({
            fieldId: data.fieldId,
            value: validatedValue.toString(),
            campo: campo
        });

        return await preenchimentoRepo.save(preenchimento);
    },

    async getPreenchimentos(): Promise<Preenchimento[]> {
        return await AppDataSource.getRepository(Preenchimento).find({ 
            relations: ['campo'] 
        });
    }
};