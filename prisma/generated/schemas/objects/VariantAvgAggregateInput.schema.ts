import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';


const makeSchema = (): z.ZodObject<any> => z.object({
  mrp: z.literal(true).optional().nullable()
}).strict();
export const VariantAvgAggregateInputObjectSchema: z.ZodType<Prisma.VariantAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.VariantAvgAggregateInputType>;
export const VariantAvgAggregateInputObjectZodSchema = makeSchema();
