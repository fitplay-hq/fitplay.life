import { z } from 'zod';

// prettier-ignore
export const VariantModelSchema = z.object({
    id: z.string(),
    variantCategory: z.string(),
    variantValue: z.string(),
    mrp: z.number().int(),
    credits: z.string().nullable(),
    product: z.unknown(),
    productId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type VariantModelType = z.infer<typeof VariantModelSchema>;
