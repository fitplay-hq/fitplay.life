import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';


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
  not: z.union([z.string(), z.lazy(makeSchema)]).optional().nullable()
}).strict();
export const NestedStringFilterObjectSchema: z.ZodType<Prisma.NestedStringFilter> = makeSchema() as unknown as z.ZodType<Prisma.NestedStringFilter>;
export const NestedStringFilterObjectZodSchema = makeSchema();
