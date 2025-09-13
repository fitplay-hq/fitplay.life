import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedStringFilterObjectSchema } from './NestedStringFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional().nullable(),
  lte: z.string().optional().nullable(),
  gt: z.string().optional().nullable(),
  gte: z.string().optional().nullable(),
  contains: z.string().optional().nullable(),
  startsWith: z.string().optional().nullable(),
  endsWith: z.string().optional().nullable(),
  not: z.union([z.string(), z.lazy(makeSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional().nullable(),
  _min: z.lazy(() => NestedStringFilterObjectSchema).optional().nullable(),
  _max: z.lazy(() => NestedStringFilterObjectSchema).optional().nullable()
}).strict();
export const NestedStringWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.NestedStringWithAggregatesFilter>;
export const NestedStringWithAggregatesFilterObjectZodSchema = makeSchema();
