import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ProductOrderByWithRelationInputObjectSchema } from './ProductOrderByWithRelationInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional().nullable(),
  variantCategory: SortOrderSchema.optional().nullable(),
  variantValue: SortOrderSchema.optional().nullable(),
  mrp: SortOrderSchema.optional().nullable(),
  credits: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional().nullable(),
  productId: SortOrderSchema.optional().nullable(),
  createdAt: SortOrderSchema.optional().nullable(),
  updatedAt: SortOrderSchema.optional().nullable(),
  product: z.lazy(() => ProductOrderByWithRelationInputObjectSchema).optional().nullable()
}).strict();
export const VariantOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.VariantOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.VariantOrderByWithRelationInput>;
export const VariantOrderByWithRelationInputObjectZodSchema = makeSchema();
