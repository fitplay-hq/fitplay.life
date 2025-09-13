import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { QueryModeSchema } from '../enums/QueryMode.schema';
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
  mode: QueryModeSchema.optional().nullable(),
  not: z.union([z.string(), z.lazy(() => NestedStringFilterObjectSchema)]).optional().nullable()
}).strict();
export const StringFilterObjectSchema: z.ZodType<Prisma.StringFilter> = makeSchema() as unknown as z.ZodType<Prisma.StringFilter>;
export const StringFilterObjectZodSchema = makeSchema();
