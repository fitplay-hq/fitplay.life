import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';


const makeSchema = (): z.ZodObject<any> => z.object({
  price: z.literal(true).optional().nullable(),
  discount: z.literal(true).optional().nullable(),
  availableStock: z.literal(true).optional().nullable(),
  avgRating: z.literal(true).optional().nullable(),
  noOfReviews: z.literal(true).optional().nullable()
}).strict();
export const ProductAvgAggregateInputObjectSchema: z.ZodType<Prisma.ProductAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ProductAvgAggregateInputType>;
export const ProductAvgAggregateInputObjectZodSchema = makeSchema();
