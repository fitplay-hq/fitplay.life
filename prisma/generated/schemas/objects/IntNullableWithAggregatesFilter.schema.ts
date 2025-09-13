import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { NestedIntNullableWithAggregatesFilterObjectSchema } from './NestedIntNullableWithAggregatesFilter.schema';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedFloatNullableFilterObjectSchema } from './NestedFloatNullableFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.number().int().optional().nullable(),
  in: z.number().int().array().optional().nullable(),
  notIn: z.number().int().array().optional().nullable(),
  lt: z.number().int().optional().nullable(),
  lte: z.number().int().optional().nullable(),
  gt: z.number().int().optional().nullable(),
  gte: z.number().int().optional().nullable(),
  not: z.union([z.number().int(), z.lazy(() => NestedIntNullableWithAggregatesFilterObjectSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional().nullable(),
  _avg: z.lazy(() => NestedFloatNullableFilterObjectSchema).optional().nullable(),
  _sum: z.lazy(() => NestedIntNullableFilterObjectSchema).optional().nullable(),
  _min: z.lazy(() => NestedIntNullableFilterObjectSchema).optional().nullable(),
  _max: z.lazy(() => NestedIntNullableFilterObjectSchema).optional().nullable()
}).strict();
export const IntNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.IntNullableWithAggregatesFilter>;
export const IntNullableWithAggregatesFilterObjectZodSchema = makeSchema();
