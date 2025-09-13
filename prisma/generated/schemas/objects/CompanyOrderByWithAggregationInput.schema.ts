import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { CompanyCountOrderByAggregateInputObjectSchema } from './CompanyCountOrderByAggregateInput.schema';
import { CompanyMaxOrderByAggregateInputObjectSchema } from './CompanyMaxOrderByAggregateInput.schema';
import { CompanyMinOrderByAggregateInputObjectSchema } from './CompanyMinOrderByAggregateInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional().nullable(),
  name: SortOrderSchema.optional().nullable(),
  address: SortOrderSchema.optional().nullable(),
  createdAt: SortOrderSchema.optional().nullable(),
  updatedAt: SortOrderSchema.optional().nullable(),
  _count: z.lazy(() => CompanyCountOrderByAggregateInputObjectSchema).optional().nullable(),
  _max: z.lazy(() => CompanyMaxOrderByAggregateInputObjectSchema).optional().nullable(),
  _min: z.lazy(() => CompanyMinOrderByAggregateInputObjectSchema).optional().nullable()
}).strict();
export const CompanyOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.CompanyOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.CompanyOrderByWithAggregationInput>;
export const CompanyOrderByWithAggregationInputObjectZodSchema = makeSchema();
