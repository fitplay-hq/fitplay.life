import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { NestedFloatNullableFilterObjectSchema } from './NestedFloatNullableFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional().nullable(),
  lte: z.number().optional().nullable(),
  gt: z.number().optional().nullable(),
  gte: z.number().optional().nullable(),
  not: z.union([z.number(), z.lazy(() => NestedFloatNullableFilterObjectSchema)]).optional().nullable()
}).strict();
export const FloatNullableFilterObjectSchema: z.ZodType<Prisma.FloatNullableFilter> = makeSchema() as unknown as z.ZodType<Prisma.FloatNullableFilter>;
export const FloatNullableFilterObjectZodSchema = makeSchema();
