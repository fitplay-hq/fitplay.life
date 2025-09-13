import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional().nullable(),
  name: z.literal(true).optional().nullable(),
  images: z.literal(true).optional().nullable(),
  description: z.literal(true).optional().nullable(),
  price: z.literal(true).optional().nullable(),
  vendorName: z.literal(true).optional().nullable(),
  tags: z.literal(true).optional().nullable(),
  discount: z.literal(true).optional().nullable(),
  sku: z.literal(true).optional().nullable(),
  availableStock: z.literal(true).optional().nullable(),
  category: z.literal(true).optional().nullable(),
  subCategory: z.literal(true).optional().nullable(),
  specifications: z.literal(true).optional().nullable(),
  avgRating: z.literal(true).optional().nullable(),
  noOfReviews: z.literal(true).optional().nullable(),
  brand: z.literal(true).optional().nullable(),
  createdAt: z.literal(true).optional().nullable(),
  updatedAt: z.literal(true).optional().nullable(),
  _all: z.literal(true).optional().nullable()
}).strict();
export const ProductCountAggregateInputObjectSchema: z.ZodType<Prisma.ProductCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ProductCountAggregateInputType>;
export const ProductCountAggregateInputObjectZodSchema = makeSchema();
