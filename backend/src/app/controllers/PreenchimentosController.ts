import { Request, Response, Router } from "express"

import PreenchimentosRepository from "../repositories/PreenchimentosRepository"

const preenchimentoRouter = Router();

preenchimentoRouter.post('/', async (req: Request, res: Response): Promise<any> => {
    try {
        const preenchimento = await PreenchimentosRepository.createPreenchimento(req.body);
        return res.status(201).json(preenchimento);
    } catch (error: any) {
        const errosPreenchimentos = [
            "Campo não encontrado.",
            "Valor inválido para tipo number.",
            "Valor inválido para tipo boolean.",
            "Valor inválido para tipo date.",
        ];

        if (errosPreenchimentos.includes(error.message)) {
            return res.status(400).json({ error: error.message });
        };

        return res.status(500).json({ message: "Internal Server Error" });
    }
});

preenchimentoRouter.get('/', async (_req: Request, res: Response): Promise<any> => {
    try {
        const preenchimentos = await PreenchimentosRepository.getPreenchimentos();
        return res.status(200).json(preenchimentos);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    };
});

export default preenchimentoRouter;