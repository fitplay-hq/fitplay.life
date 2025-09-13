import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional().nullable(),
  variantCategory: z.literal(true).optional().nullable(),
  variantValue: z.literal(true).optional().nullable(),
  mrp: z.literal(true).optional().nullable(),
  credits: z.literal(true).optional().nullable(),
  productId: z.literal(true).optional().nullable(),
  createdAt: z.literal(true).optional().nullable(),
  updatedAt: z.literal(true).optional().nullable(),
  _all: z.literal(true).optional().nullable()
}).strict();
export const VariantCountAggregateInputObjectSchema: z.ZodType<Prisma.VariantCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.VariantCountAggregateInputType>;
export const VariantCountAggregateInputObjectZodSchema = makeSchema();
