import { Request, Response, Router } from "express"

import CamposRepository from "../repositories/CamposRepository"

const camposRouter = Router();

camposRouter.post('/', async (req: Request, res: Response): Promise<any> => {
    try {
        // Validação dos dados de entrada
        if (!req.body.name || !req.body.datatype) {
            return res.status(400).json({ error: "Nome e tipo são obrigatórios" });
        }

        // Valida o tipo de dado
        const validDataTypes = ['string', 'number', 'boolean', 'date'];
        if (!validDataTypes.includes(req.body.datatype)) {
            return res.status(400).json({ error: "Tipo de dado inválido" });
        }

        const campo = await CamposRepository.createCampo(req.body);
        return res.status(201).json(campo);
    } catch (error: any) {
        // Valida nome duplicado
        if (error.message === "Já existe um campo com este nome") {
            return res.status(400).json({ error: error.message });
        }

        console.error('Erro ao criar campo:', error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

camposRouter.get('/', async (_req: Request, res: Response): Promise<any> => {
    try {
        const campos = await CamposRepository.getCampos();
        return res.status(200).json(campos);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    };
});

export default camposRouter