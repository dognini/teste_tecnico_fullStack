import { Request, Response } from 'express'

import { campoSchema } from '../../validations/campoValidation'
import CamposRepository from '../repositories/CamposRepository'

export class CampoController {
    async create(req: Request, res: Response): Promise<any> {
        try {
            const validatedData = campoSchema.parse(req.body);
            const campo = await CamposRepository.createCampo(validatedData);

            return res.status(201).json(campo);
        } catch (erro) {
            return res.status(400).json({ error: (erro as Error).message });
        }
    }

    async getAll(req: Request, res: Response): Promise<any> {
        try {
            const campos = await CamposRepository.getCampos();
            
            return res.json(campos);
        } catch (erro) {
            return res.status(500).json({ error: 'Erro ao buscar campos' });
        }
    }
}