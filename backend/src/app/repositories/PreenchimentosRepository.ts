import { Campos } from "../entities/Campos"
import { Preenchimento } from "../entities/Preenchimento"
import { AppDataSource } from "../../database/data-source"
import { preenchimentoSchema } from "../../validations/preenchimentoValidation"

export default {
    async createPreenchimento(data: { 
        fieldId: string, 
        value: string | number | boolean | Date 
    }): Promise<Preenchimento> {
        const validatedData = preenchimentoSchema.parse(data);
        
        const campoRepo = AppDataSource.getRepository(Campos);
        const preenchimentoRepo = AppDataSource.getRepository(Preenchimento);

        const campo = await campoRepo.findOne({ 
            where: { id: validatedData.fieldId } 
        });

        if (!campo) {
            throw new Error("Campo não encontrado.");
        }

        let convertedValue: string;
        try {
            switch (campo.datatype) {
                case 'number':
                    const numValue = Number(validatedData.value);
                    if (isNaN(numValue)) throw new Error("Valor inválido para tipo number.");
                    convertedValue = numValue.toString();
                    break;
                case 'boolean':
                    if (typeof validatedData.value === 'string') {
                        convertedValue = (validatedData.value.toLowerCase() === 'true').toString();
                    } else {
                        convertedValue = Boolean(validatedData.value).toString();
                    }
                    break;
                case 'date':
                    const dateValue = new Date(validatedData.value as Date);
                    if (isNaN(dateValue.getTime())) throw new Error("Data inválida.");
                    convertedValue = dateValue.toISOString();
                    break;
                default:
                    convertedValue = String(validatedData.value);
            }

            const preenchimento = new Preenchimento();
            preenchimento.fieldId = validatedData.fieldId;
            preenchimento.value = convertedValue;

            return await preenchimentoRepo.save(preenchimento);
        } catch (error) {
            throw new Error(`Erro ao criar preenchimento: ${(error as Error).message}`);
        }
    },

    async getPreenchimentos(): Promise<Preenchimento[]> {
        return await AppDataSource.getRepository(Preenchimento).find({ 
            relations: ['campo'],
            order: { createdAt: 'DESC' }
        });
    }
};