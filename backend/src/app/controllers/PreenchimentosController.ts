import { z } from 'zod'
import { Request, Response } from 'express'

import PreenchimentosRepository from '../repositories/PreenchimentosRepository'

const preenchimentoSchema = z.object({
    fieldId: z.string().uuid(),
    value: z.union([z.string(), z.number(), z.boolean(), z.date()])
});

export class PreenchimentoController {
    async create(req: Request, res: Response): Promise<any> {
        try {
            const validatedData = preenchimentoSchema.parse(req.body);
            const preenchimento = await PreenchimentosRepository.createPreenchimento(validatedData);
            
            return res.status(201).json(preenchimento);
        } catch (erro) {
            return res.status(400).json({ error: (erro as Error).message });
        }
    }

    async getAll(req: Request, res: Response): Promise<any> {
        try {
            const preenchimentos = await PreenchimentosRepository.getPreenchimentos();

            return res.json(preenchimentos);
        } catch (erro) {
            return res.status(500).json({ error: 'Erro ao buscar preenchimentos' });
        }
    }
}