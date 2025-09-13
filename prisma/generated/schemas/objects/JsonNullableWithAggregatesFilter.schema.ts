import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { QueryModeSchema } from '../enums/QueryMode.schema';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedJsonNullableFilterObjectSchema } from './NestedJsonNullableFilter.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: jsonSchema.optional().nullable(),
  path: z.string().array().optional().nullable(),
  mode: QueryModeSchema.optional().nullable(),
  string_contains: z.string().optional().nullable(),
  string_starts_with: z.string().optional().nullable(),
  string_ends_with: z.string().optional().nullable(),
  array_starts_with: jsonSchema.optional().nullable(),
  array_ends_with: jsonSchema.optional().nullable(),
  array_contains: jsonSchema.optional().nullable(),
  lt: jsonSchema.optional().nullable(),
  lte: jsonSchema.optional().nullable(),
  gt: jsonSchema.optional().nullable(),
  gte: jsonSchema.optional().nullable(),
  not: jsonSchema.optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional().nullable(),
  _min: z.lazy(() => NestedJsonNullableFilterObjectSchema).optional().nullable(),
  _max: z.lazy(() => NestedJsonNullableFilterObjectSchema).optional().nullable()
}).strict();
export const JsonNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.JsonNullableWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.JsonNullableWithAggregatesFilter>;
export const JsonNullableWithAggregatesFilterObjectZodSchema = makeSchema();
