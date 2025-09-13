import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional().nullable(),
  name: SortOrderSchema.optional().nullable(),
  email: SortOrderSchema.optional().nullable(),
  password: SortOrderSchema.optional().nullable(),
  phone: SortOrderSchema.optional().nullable(),
  role: SortOrderSchema.optional().nullable(),
  gender: SortOrderSchema.optional().nullable(),
  birthDate: SortOrderSchema.optional().nullable(),
  companyId: SortOrderSchema.optional().nullable(),
  createdAt: SortOrderSchema.optional().nullable(),
  updatedAt: SortOrderSchema.optional().nullable(),
  verified: SortOrderSchema.optional().nullable()
}).strict();
export const UserMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.UserMaxOrderByAggregateInput>;
export const UserMaxOrderByAggregateInputObjectZodSchema = makeSchema();
