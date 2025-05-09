import { Request, Response, Router } from "express"

import CamposRepository from "../repositories/CamposRepository"

const camposRouter = Router();

camposRouter.post('/', async (req: Request, res: Response): Promise<any> => {
    try {
        const campo = await CamposRepository.createCampo(req.body);
        return res.status(201).json(campo);
    } catch (error: any) {
        if (error.message === "Já existe um campo com este nome") {
            return res.status(400).json({ error: error.message });
        };

        return res.status(500).json({ error: "Internal server error" });
    };
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