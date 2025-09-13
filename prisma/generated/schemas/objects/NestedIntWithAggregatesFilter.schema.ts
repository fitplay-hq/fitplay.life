import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedFloatFilterObjectSchema } from './NestedFloatFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.number().int().optional().nullable(),
  in: z.number().int().array().optional().nullable(),
  notIn: z.number().int().array().optional().nullable(),
  lt: z.number().int().optional().nullable(),
  lte: z.number().int().optional().nullable(),
  gt: z.number().int().optional().nullable(),
  gte: z.number().int().optional().nullable(),
  not: z.union([z.number().int(), z.lazy(makeSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional().nullable(),
  _avg: z.lazy(() => NestedFloatFilterObjectSchema).optional().nullable(),
  _sum: z.lazy(() => NestedIntFilterObjectSchema).optional().nullable(),
  _min: z.lazy(() => NestedIntFilterObjectSchema).optional().nullable(),
  _max: z.lazy(() => NestedIntFilterObjectSchema).optional().nullable()
}).strict();
export const NestedIntWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.NestedIntWithAggregatesFilter>;
export const NestedIntWithAggregatesFilterObjectZodSchema = makeSchema();
