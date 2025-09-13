import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { NestedDateTimeFilterObjectSchema } from './NestedDateTimeFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.date().optional().nullable(),
  in: z.union([z.date().array(), z.string().datetime().array()]).optional().nullable(),
  notIn: z.union([z.date().array(), z.string().datetime().array()]).optional().nullable(),
  lt: z.date().optional().nullable(),
  lte: z.date().optional().nullable(),
  gt: z.date().optional().nullable(),
  gte: z.date().optional().nullable(),
  not: z.union([z.date(), z.lazy(() => NestedDateTimeFilterObjectSchema)]).optional().nullable()
}).strict();
export const DateTimeFilterObjectSchema: z.ZodType<Prisma.DateTimeFilter> = makeSchema() as unknown as z.ZodType<Prisma.DateTimeFilter>;
export const DateTimeFilterObjectZodSchema = makeSchema();
