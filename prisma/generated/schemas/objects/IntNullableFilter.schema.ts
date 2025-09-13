import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: z.number().int().optional().nullable(),
  in: z.number().int().array().optional().nullable(),
  notIn: z.number().int().array().optional().nullable(),
  lt: z.number().int().optional().nullable(),
  lte: z.number().int().optional().nullable(),
  gt: z.number().int().optional().nullable(),
  gte: z.number().int().optional().nullable(),
  not: z.union([z.number().int(), z.lazy(() => NestedIntNullableFilterObjectSchema)]).optional().nullable()
}).strict();
export const IntNullableFilterObjectSchema: z.ZodType<Prisma.IntNullableFilter> = makeSchema() as unknown as z.ZodType<Prisma.IntNullableFilter>;
export const IntNullableFilterObjectZodSchema = makeSchema();
