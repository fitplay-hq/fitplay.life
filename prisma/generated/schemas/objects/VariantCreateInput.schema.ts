import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { ProductCreateNestedOneWithoutVariantsInputObjectSchema } from './ProductCreateNestedOneWithoutVariantsInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional().nullable(),
  variantCategory: z.string().max(50),
  variantValue: z.string().max(100),
  mrp: z.number().int(),
  credits: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  product: z.lazy(() => ProductCreateNestedOneWithoutVariantsInputObjectSchema)
}).strict();
export const VariantCreateInputObjectSchema: z.ZodType<Prisma.VariantCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.VariantCreateInput>;
export const VariantCreateInputObjectZodSchema = makeSchema();
