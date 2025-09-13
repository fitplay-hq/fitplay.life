import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { AdminCountOrderByAggregateInputObjectSchema } from './AdminCountOrderByAggregateInput.schema';
import { AdminMaxOrderByAggregateInputObjectSchema } from './AdminMaxOrderByAggregateInput.schema';
import { AdminMinOrderByAggregateInputObjectSchema } from './AdminMinOrderByAggregateInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional().nullable(),
  name: SortOrderSchema.optional().nullable(),
  email: SortOrderSchema.optional().nullable(),
  password: SortOrderSchema.optional().nullable(),
  role: SortOrderSchema.optional().nullable(),
  createdAt: SortOrderSchema.optional().nullable(),
  updatedAt: SortOrderSchema.optional().nullable(),
  _count: z.lazy(() => AdminCountOrderByAggregateInputObjectSchema).optional().nullable(),
  _max: z.lazy(() => AdminMaxOrderByAggregateInputObjectSchema).optional().nullable(),
  _min: z.lazy(() => AdminMinOrderByAggregateInputObjectSchema).optional().nullable()
}).strict();
export const AdminOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.AdminOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.AdminOrderByWithAggregationInput>;
export const AdminOrderByWithAggregationInputObjectZodSchema = makeSchema();
