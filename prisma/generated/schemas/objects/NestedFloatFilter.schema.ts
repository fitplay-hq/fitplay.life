import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';


const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional().nullable(),
  lte: z.number().optional().nullable(),
  gt: z.number().optional().nullable(),
  gte: z.number().optional().nullable(),
  not: z.union([z.number(), z.lazy(makeSchema)]).optional().nullable()
}).strict();
export const NestedFloatFilterObjectSchema: z.ZodType<Prisma.NestedFloatFilter> = makeSchema() as unknown as z.ZodType<Prisma.NestedFloatFilter>;
export const NestedFloatFilterObjectZodSchema = makeSchema();
