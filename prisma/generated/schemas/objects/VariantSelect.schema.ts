import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { ProductArgsObjectSchema } from './ProductArgs.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.boolean().optional().nullable(),
  variantCategory: z.boolean().optional().nullable(),
  variantValue: z.boolean().optional().nullable(),
  mrp: z.boolean().optional().nullable(),
  credits: z.boolean().optional().nullable(),
  product: z.union([z.boolean(), z.lazy(() => ProductArgsObjectSchema)]).optional().nullable(),
  productId: z.boolean().optional().nullable(),
  createdAt: z.boolean().optional().nullable(),
  updatedAt: z.boolean().optional().nullable()
}).strict();
export const VariantSelectObjectSchema: z.ZodType<Prisma.VariantSelect> = makeSchema() as unknown as z.ZodType<Prisma.VariantSelect>;
export const VariantSelectObjectZodSchema = makeSchema();
