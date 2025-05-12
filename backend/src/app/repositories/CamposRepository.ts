import { Campos } from "../entities/Campos"
import { AppDataSource } from "../../database/data-source"
import { campoSchema } from "../../validations/campoValidation"

import { CampoDataType } from "../interfaces/ICampos"

export default {
    async createCampo(data: { name: string; datatype: CampoDataType }): Promise<Campos> {
        const validatedData = campoSchema.parse(data);
        
        const existingCampo = await AppDataSource.getRepository(Campos).findOne({ 
            where: { name: validatedData.name } 
        });
        
        if (existingCampo) {
            throw new Error("Já existe um campo com este nome");
        }

        const campo = new Campos();
        campo.name = validatedData.name;
        campo.datatype = validatedData.datatype as CampoDataType;

        return await AppDataSource.getRepository(Campos).save(campo);
    },

    async getCampos(): Promise<Campos[]> {
        return await AppDataSource.getRepository(Campos).find({
            order: { createdAt: 'DESC' }
        });
    }
};