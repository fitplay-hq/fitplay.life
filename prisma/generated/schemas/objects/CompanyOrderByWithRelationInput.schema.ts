import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UserOrderByRelationAggregateInputObjectSchema } from './UserOrderByRelationAggregateInput.schema';
import { ProductOrderByRelationAggregateInputObjectSchema } from './ProductOrderByRelationAggregateInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional().nullable(),
  name: SortOrderSchema.optional().nullable(),
  address: SortOrderSchema.optional().nullable(),
  createdAt: SortOrderSchema.optional().nullable(),
  updatedAt: SortOrderSchema.optional().nullable(),
  users: z.lazy(() => UserOrderByRelationAggregateInputObjectSchema).optional(),
  products: z.lazy(() => ProductOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const CompanyOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.CompanyOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.CompanyOrderByWithRelationInput>;
export const CompanyOrderByWithRelationInputObjectZodSchema = makeSchema();
