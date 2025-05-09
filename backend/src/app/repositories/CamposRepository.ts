import Campos from "../entities/Campos"
import ICampos from "../interfaces/ICampos"
import { AppDataSource } from "../../database/data-source"

export default {
    async createCampo(data: { name: string; datatype: string }): Promise<any> {
        // Verifica se campo já existe
        const existingCampo = await AppDataSource.getRepository(Campos).findOne({ 
            where: { name: data.name } 
        });
        
        if (existingCampo) {
            throw new Error("Já existe um campo com este nome");
        }

        const campo = AppDataSource.getRepository(Campos).create(data);
        return await AppDataSource.getRepository(Campos).save(campo);
    },

    async getCampos(): Promise<ICampos[]> {
        return await AppDataSource.getRepository(Campos).find();
    }
}