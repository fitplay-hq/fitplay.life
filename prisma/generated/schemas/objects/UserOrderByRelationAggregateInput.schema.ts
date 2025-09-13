import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  _count: SortOrderSchema.optional().nullable()
}).strict();
export const UserOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.UserOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrderByRelationAggregateInput>;
export const UserOrderByRelationAggregateInputObjectZodSchema = makeSchema();
