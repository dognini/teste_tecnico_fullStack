import { Router } from "express"

import camposRouter from "../controllers/CamposController"
import preenchimentoRouter from "../controllers/PreenchimentosController"

const routes = Router();

routes.use('/campos', camposRouter);
routes.use('/preenchimentos', preenchimentoRouter);

export default routes