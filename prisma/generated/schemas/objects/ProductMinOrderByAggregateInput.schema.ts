import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional().nullable(),
  name: SortOrderSchema.optional().nullable(),
  description: SortOrderSchema.optional().nullable(),
  price: SortOrderSchema.optional().nullable(),
  vendorName: SortOrderSchema.optional().nullable(),
  discount: SortOrderSchema.optional().nullable(),
  sku: SortOrderSchema.optional().nullable(),
  availableStock: SortOrderSchema.optional().nullable(),
  category: SortOrderSchema.optional().nullable(),
  subCategory: SortOrderSchema.optional().nullable(),
  avgRating: SortOrderSchema.optional().nullable(),
  noOfReviews: SortOrderSchema.optional().nullable(),
  brand: SortOrderSchema.optional().nullable(),
  createdAt: SortOrderSchema.optional().nullable(),
  updatedAt: SortOrderSchema.optional().nullable()
}).strict();
export const ProductMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ProductMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductMinOrderByAggregateInput>;
export const ProductMinOrderByAggregateInputObjectZodSchema = makeSchema();
