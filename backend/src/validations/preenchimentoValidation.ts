import { z } from 'zod';

export const preenchimentoSchema = z.object({
    fieldId: z.string().uuid('ID do campo inválido'),
    value: z.union([
        z.string(),
        z.number(),
        z.boolean(),
        z.string().transform(str => new Date(str))
    ])
});