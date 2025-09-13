import { z } from 'zod';
export const VariantCreateManyResultSchema = z.object({
  count: z.number()
});