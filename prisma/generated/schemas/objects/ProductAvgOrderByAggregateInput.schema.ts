import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  price: SortOrderSchema.optional().nullable(),
  discount: SortOrderSchema.optional().nullable(),
  availableStock: SortOrderSchema.optional().nullable(),
  avgRating: SortOrderSchema.optional().nullable(),
  noOfReviews: SortOrderSchema.optional().nullable()
}).strict();
export const ProductAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ProductAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductAvgOrderByAggregateInput>;
export const ProductAvgOrderByAggregateInputObjectZodSchema = makeSchema();
