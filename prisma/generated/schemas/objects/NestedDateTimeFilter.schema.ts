import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';


const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.date().optional().nullable(),
  in: z.union([z.date().array(), z.string().datetime().array()]).optional().nullable(),
  notIn: z.union([z.date().array(), z.string().datetime().array()]).optional().nullable(),
  lt: z.date().optional().nullable(),
  lte: z.date().optional().nullable(),
  gt: z.date().optional().nullable(),
  gte: z.date().optional().nullable(),
  not: z.union([z.date(), z.lazy(makeSchema)]).optional().nullable()
}).strict();
export const NestedDateTimeFilterObjectSchema: z.ZodType<Prisma.NestedDateTimeFilter> = makeSchema() as unknown as z.ZodType<Prisma.NestedDateTimeFilter>;
export const NestedDateTimeFilterObjectZodSchema = makeSchema();
