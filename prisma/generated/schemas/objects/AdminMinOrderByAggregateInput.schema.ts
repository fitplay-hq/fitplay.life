import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional().nullable(),
  name: SortOrderSchema.optional().nullable(),
  email: SortOrderSchema.optional().nullable(),
  password: SortOrderSchema.optional().nullable(),
  role: SortOrderSchema.optional().nullable(),
  createdAt: SortOrderSchema.optional().nullable(),
  updatedAt: SortOrderSchema.optional().nullable()
}).strict();
export const AdminMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AdminMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AdminMinOrderByAggregateInput>;
export const AdminMinOrderByAggregateInputObjectZodSchema = makeSchema();
