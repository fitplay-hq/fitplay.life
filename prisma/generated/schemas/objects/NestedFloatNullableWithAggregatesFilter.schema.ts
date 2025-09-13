import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedFloatNullableFilterObjectSchema } from './NestedFloatNullableFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional().nullable(),
  lte: z.number().optional().nullable(),
  gt: z.number().optional().nullable(),
  gte: z.number().optional().nullable(),
  not: z.union([z.number(), z.lazy(makeSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional().nullable(),
  _avg: z.lazy(() => NestedFloatNullableFilterObjectSchema).optional().nullable(),
  _sum: z.lazy(() => NestedFloatNullableFilterObjectSchema).optional().nullable(),
  _min: z.lazy(() => NestedFloatNullableFilterObjectSchema).optional().nullable(),
  _max: z.lazy(() => NestedFloatNullableFilterObjectSchema).optional().nullable()
}).strict();
export const NestedFloatNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter>;
export const NestedFloatNullableWithAggregatesFilterObjectZodSchema = makeSchema();
