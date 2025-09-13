import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  mrp: SortOrderSchema.optional().nullable()
}).strict();
export const VariantAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.VariantAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.VariantAvgOrderByAggregateInput>;
export const VariantAvgOrderByAggregateInputObjectZodSchema = makeSchema();
