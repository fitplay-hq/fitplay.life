import { z } from 'zod';

// prettier-ignore
export const VariantInputSchema = z.object({
    id: z.string(),
    variantCategory: z.string(),
    variantValue: z.string(),
    mrp: z.number().int(),
    credits: z.string().optional().nullable(),
    product: z.unknown(),
    productId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type VariantInputType = z.infer<typeof VariantInputSchema>;
