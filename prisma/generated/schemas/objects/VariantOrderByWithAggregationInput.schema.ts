import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { VariantCountOrderByAggregateInputObjectSchema } from './VariantCountOrderByAggregateInput.schema';
import { VariantAvgOrderByAggregateInputObjectSchema } from './VariantAvgOrderByAggregateInput.schema';
import { VariantMaxOrderByAggregateInputObjectSchema } from './VariantMaxOrderByAggregateInput.schema';
import { VariantMinOrderByAggregateInputObjectSchema } from './VariantMinOrderByAggregateInput.schema';
import { VariantSumOrderByAggregateInputObjectSchema } from './VariantSumOrderByAggregateInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional().nullable(),
  variantCategory: SortOrderSchema.optional().nullable(),
  variantValue: SortOrderSchema.optional().nullable(),
  mrp: SortOrderSchema.optional().nullable(),
  credits: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional().nullable(),
  productId: SortOrderSchema.optional().nullable(),
  createdAt: SortOrderSchema.optional().nullable(),
  updatedAt: SortOrderSchema.optional().nullable(),
  _count: z.lazy(() => VariantCountOrderByAggregateInputObjectSchema).optional().nullable(),
  _avg: z.lazy(() => VariantAvgOrderByAggregateInputObjectSchema).optional().nullable(),
  _max: z.lazy(() => VariantMaxOrderByAggregateInputObjectSchema).optional().nullable(),
  _min: z.lazy(() => VariantMinOrderByAggregateInputObjectSchema).optional().nullable(),
  _sum: z.lazy(() => VariantSumOrderByAggregateInputObjectSchema).optional().nullable()
}).strict();
export const VariantOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.VariantOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.VariantOrderByWithAggregationInput>;
export const VariantOrderByWithAggregationInputObjectZodSchema = makeSchema();
