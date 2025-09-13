import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';


const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.number().int().optional().nullable(),
  in: z.number().int().array().optional().nullable(),
  notIn: z.number().int().array().optional().nullable(),
  lt: z.number().int().optional().nullable(),
  lte: z.number().int().optional().nullable(),
  gt: z.number().int().optional().nullable(),
  gte: z.number().int().optional().nullable(),
  not: z.union([z.number().int(), z.lazy(makeSchema)]).optional().nullable()
}).strict();
export const NestedIntFilterObjectSchema: z.ZodType<Prisma.NestedIntFilter> = makeSchema() as unknown as z.ZodType<Prisma.NestedIntFilter>;
export const NestedIntFilterObjectZodSchema = makeSchema();
