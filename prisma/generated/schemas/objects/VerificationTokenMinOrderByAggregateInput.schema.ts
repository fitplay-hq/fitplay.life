import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional().nullable(),
  identifier: SortOrderSchema.optional().nullable(),
  token: SortOrderSchema.optional().nullable(),
  expires: SortOrderSchema.optional().nullable(),
  createdAt: SortOrderSchema.optional().nullable()
}).strict();
export const VerificationTokenMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput>;
export const VerificationTokenMinOrderByAggregateInputObjectZodSchema = makeSchema();
