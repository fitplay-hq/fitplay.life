import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional().nullable(),
  variantCategory: z.string().max(50),
  variantValue: z.string().max(100),
  mrp: z.number().int(),
  credits: z.string().optional().nullable(),
  productId: z.string(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();
export const VariantCreateManyInputObjectSchema: z.ZodType<Prisma.VariantCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.VariantCreateManyInput>;
export const VariantCreateManyInputObjectZodSchema = makeSchema();
