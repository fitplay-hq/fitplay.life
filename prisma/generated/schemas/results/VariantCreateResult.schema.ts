import { z } from 'zod';
export const VariantCreateResultSchema = z.object({
  id: z.string(),
  variantCategory: z.string(),
  variantValue: z.string(),
  mrp: z.number().int(),
  credits: z.string().optional(),
  product: z.unknown(),
  productId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
});