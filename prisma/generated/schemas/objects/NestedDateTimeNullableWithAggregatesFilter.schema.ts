import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedDateTimeNullableFilterObjectSchema } from './NestedDateTimeNullableFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.date().optional().nullable(),
  in: z.union([z.date().array(), z.string().datetime().array()]).optional().nullable(),
  notIn: z.union([z.date().array(), z.string().datetime().array()]).optional().nullable(),
  lt: z.date().optional().nullable(),
  lte: z.date().optional().nullable(),
  gt: z.date().optional().nullable(),
  gte: z.date().optional().nullable(),
  not: z.union([z.date(), z.lazy(makeSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional().nullable(),
  _min: z.lazy(() => NestedDateTimeNullableFilterObjectSchema).optional().nullable(),
  _max: z.lazy(() => NestedDateTimeNullableFilterObjectSchema).optional().nullable()
}).strict();
export const NestedDateTimeNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter>;
export const NestedDateTimeNullableWithAggregatesFilterObjectZodSchema = makeSchema();
