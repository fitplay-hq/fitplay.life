import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional().nullable(),
  name: SortOrderSchema.optional().nullable(),
  address: SortOrderSchema.optional().nullable(),
  createdAt: SortOrderSchema.optional().nullable(),
  updatedAt: SortOrderSchema.optional().nullable()
}).strict();
export const CompanyMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CompanyMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CompanyMinOrderByAggregateInput>;
export const CompanyMinOrderByAggregateInputObjectZodSchema = makeSchema();
