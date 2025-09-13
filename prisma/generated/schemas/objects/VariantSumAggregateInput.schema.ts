import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';


const makeSchema = (): z.ZodObject<any> => z.object({
  mrp: z.literal(true).optional().nullable()
}).strict();
export const VariantSumAggregateInputObjectSchema: z.ZodType<Prisma.VariantSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.VariantSumAggregateInputType>;
export const VariantSumAggregateInputObjectZodSchema = makeSchema();
