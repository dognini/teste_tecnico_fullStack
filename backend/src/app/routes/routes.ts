import { Router } from "express"

import { CampoController } from "../controllers/CamposController"
import { PreenchimentoController } from "../controllers/PreenchimentosController"

const router = Router();
const campoController = new CampoController();
const preenchimentoController = new PreenchimentoController();

router.post('/campos', campoController.create.bind(campoController));
router.get('/campos', campoController.getAll.bind(campoController));

router.post('/preenchimentos', preenchimentoController.create.bind(preenchimentoController));
router.get('/preenchimentos', preenchimentoController.getAll.bind(preenchimentoController));

export default router