import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional().nullable(),
  variantCategory: SortOrderSchema.optional().nullable(),
  variantValue: SortOrderSchema.optional().nullable(),
  mrp: SortOrderSchema.optional().nullable(),
  credits: SortOrderSchema.optional().nullable(),
  productId: SortOrderSchema.optional().nullable(),
  createdAt: SortOrderSchema.optional().nullable(),
  updatedAt: SortOrderSchema.optional().nullable()
}).strict();
export const VariantMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.VariantMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.VariantMaxOrderByAggregateInput>;
export const VariantMaxOrderByAggregateInputObjectZodSchema = makeSchema();
