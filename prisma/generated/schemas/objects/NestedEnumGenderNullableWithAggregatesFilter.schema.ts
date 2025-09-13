import { z } from 'zod';
import type { Prisma } from '../../../../lib/generated/prisma';
import { GenderSchema } from '../enums/Gender.schema';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumGenderNullableFilterObjectSchema } from './NestedEnumGenderNullableFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  equals: GenderSchema.optional().nullable(),
  in: GenderSchema.array().optional().nullable(),
  notIn: GenderSchema.array().optional().nullable(),
  not: z.union([GenderSchema, z.lazy(makeSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional().nullable(),
  _min: z.lazy(() => NestedEnumGenderNullableFilterObjectSchema).optional().nullable(),
  _max: z.lazy(() => NestedEnumGenderNullableFilterObjectSchema).optional().nullable()
}).strict();
export const NestedEnumGenderNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumGenderNullableWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.NestedEnumGenderNullableWithAggregatesFilter>;
export const NestedEnumGenderNullableWithAggregatesFilterObjectZodSchema = makeSchema();
