import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { VerificationTokenCountOrderByAggregateInputObjectSchema } from './VerificationTokenCountOrderByAggregateInput.schema';
import { VerificationTokenMaxOrderByAggregateInputObjectSchema } from './VerificationTokenMaxOrderByAggregateInput.schema';
import { VerificationTokenMinOrderByAggregateInputObjectSchema } from './VerificationTokenMinOrderByAggregateInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional().nullable(),
  identifier: SortOrderSchema.optional().nullable(),
  token: SortOrderSchema.optional().nullable(),
  expires: SortOrderSchema.optional().nullable(),
  createdAt: SortOrderSchema.optional().nullable(),
  _count: z.lazy(() => VerificationTokenCountOrderByAggregateInputObjectSchema).optional().nullable(),
  _max: z.lazy(() => VerificationTokenMaxOrderByAggregateInputObjectSchema).optional().nullable(),
  _min: z.lazy(() => VerificationTokenMinOrderByAggregateInputObjectSchema).optional().nullable()
}).strict();
export const VerificationTokenOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput>;
export const VerificationTokenOrderByWithAggregationInputObjectZodSchema = makeSchema();
