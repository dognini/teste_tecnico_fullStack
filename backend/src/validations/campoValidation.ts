import { z } from 'zod'

import { CampoDataType } from '../app/interfaces/ICampos'

export const campoSchema = z.object({
    name: z.string().min(1),
    datatype: z.enum([CampoDataType.BOOLEAN, CampoDataType.STRING, CampoDataType.DATE, CampoDataType.NUMBER])
});